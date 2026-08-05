const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Project = require("../models/Project");

const sendCookies = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const signup = async (req, res, next) => {
    try{
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await User.create({ name, email, password });
        await Project.create({ user: user._id, name: "Inbox", isInbox: true });
        sendCookies(res, user._id);
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        next(error);
    }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        sendCookies(res, user._id);
        res.json(user)
    } catch (error) {
        next(error);
    }
}

const me = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

module.exports = { signup, login, me, logout };
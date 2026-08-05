const express = require("express");
const router = express.Router();
const { signup, login, logout, me } = require("../controllers/authController");
const protect = require("../middleware/auth");


router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", logout);

module.exports = router;
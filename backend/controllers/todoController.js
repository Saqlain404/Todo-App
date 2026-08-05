const Todo = require("../models/Todo");

const getTodos = async (req, res, next) => {
  try {
    const filter = { user: req.user._id };
    if (req.query.projectId) {
      filter.project = req.query.projectId;
    }
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    next(error);
  }
};

const createTodo = async (req, res, next) => {
  try {
    const { title, project } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Please enter todo title" });
    }
    const todo = await Todo.create({
      user: req.user._id,
      title: title.trim(),
      project: project || null,
      isComplete: false,
    });
    res.status(201).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const { title, isComplete, project } = req.body;
    if (title !== undefined) todo.title = title.trim();
    if (isComplete !== undefined) todo.isComplete = isComplete;
    if (project !== undefined) todo.project = project || null;
    await todo.save();
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
    try{
        const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        await todo.deleteOne();
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        next(error);
    }
}


module.exports = { getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
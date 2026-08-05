const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {getTodos, createTodo, updateTodo, deleteTodo} = require("../controllers/todoController");

router.use(protect);
router.route("/").get(getTodos).post(createTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);

module.exports = router;
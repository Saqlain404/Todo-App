const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { createProject, getProjects, renameProject, deleteProject } = require("../controllers/projectController");

router.use(protect);
router.route("/").get(getProjects).post(createProject);
router.route("/:id").put(renameProject).delete(deleteProject);

module.exports = router;
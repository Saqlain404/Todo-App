const Project = require("../models/Project");
const Todo = require("../models/Todo");

const getProjects = async (req, res, next) => {
    try{
        const projects = await Project.find({ user: req.user._id }).sort({ createdAt: 1 });
        res.json(projects);
    } catch (error) {
        next(error);
    }
}

const createProject = async (req, res, next) => {
    try{
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Please enter project name" });
        }
        const project = await Project.create({ user: req.user._id, name });
        res.status(201).json(project);
    } catch (error) {
        next(error);
    }
}

const renameProject = async (req, res, next) => {
    try{
        const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if(project.isInbox){
            return res.status(400).json({ message: "Inbox project cannot be renamed" });
        }
        if(!req.body.name || !req.body.name.trim()){
            return res.status(400).json({ message: "Please enter project name" });
        }
        project.name = req.body.name.trim();
        await project.save();
        res.json(project);
    } catch (error) {
        next(error);
    }
}

const deleteProject = async (req, res, next) => {
    try{
        const project = await Project.findOne({ _id: req.params.id, user: req.user._id });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        if(project.isInbox){
            return res.status(400).json({ message: "Inbox project cannot be deleted" });
        }
        const inbox = await Project.findOne({ user: req.user._id, isInbox: true });
        await Todo.updateMany(
            {user: req.user._id, project: project._id},
            { project: inbox ? inbox._id : null }
        )
        await project.deleteOne();
        res.json({ message: "Project deleted successfully" });
    }catch (error) {
        next(error);
    }
}

module.exports = { getProjects, createProject, renameProject, deleteProject };
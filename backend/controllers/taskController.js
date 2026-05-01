const Task = require('../models/Task');
const Project = require('../models/Project');

// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'Admin') {
      // Admins see tasks for projects they created
      const projects = await Project.find({ createdBy: req.user._id });
      const projectIds = projects.map(p => p._id);
      tasks = await Task.find({ projectId: { $in: projectIds } }).populate('assignedTo', 'name email').populate('projectId', 'name');
    } else {
      // Members see tasks assigned to them
      tasks = await Task.find({ assignedTo: req.user._id }).populate('projectId', 'name');
    }
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   POST /api/tasks
// @access  Private/Admin
const createTask = async (req, res) => {
  try {
    const { title, description, projectId, assignedTo, dueDate } = req.body;

    if (!title || !projectId) {
      return res.status(400).json({ message: 'Title and Project ID are required' });
    }

    const project = await Project.findById(projectId);
    if (!project || project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to add task to this project' });
    }

    const task = new Task({
      title,
      description,
      projectId,
      assignedTo,
      dueDate
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo, dueDate } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (req.user.role === 'Admin') {
      // Admin can update everything
      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;
      task.assignedTo = assignedTo || task.assignedTo;
      task.dueDate = dueDate || task.dueDate;
    } else {
      // Member can only update status
      if (task.assignedTo.toString() !== req.user._id.toString()) {
         return res.status(401).json({ message: 'Not authorized to update this task' });
      }
      task.status = status || task.status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   DELETE /api/tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const project = await Project.findById(task.projectId);
    if (!project || project.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };

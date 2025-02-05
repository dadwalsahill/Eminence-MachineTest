const Task = require("../models/tasks");

exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, status } = req.body;

    if (!title || !description || !dueDate) {
      return res
        .status(400)
        .json({ message: "Title, description, and due date are required." });
    }

    const newTask = new Task({
      title,
      description,
      priority: priority || "Medium", // Default priority if not provided
      dueDate,
      status: status || "Incomplete", // Default status if not provided
      user: req.user.id,
    });
    await newTask.save();

    res
      .status(201)
      .json({ message: "Task created successfully!", task: newTask });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res
      .status(200)
      .json({ message: "Task updated successfully!", task: updatedTask });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Get All Tasks Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!" });
    }
    res.status(200).json({ task });
  } catch (error) {
    console.error("Get Task By ID Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await Task.find({
      user: req.user.id,
      status: "Completed",
    });
    res.status(200).json({ tasks: completedTasks });
  } catch (error) {
    console.error("Get Completed Tasks Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.getIncompleteTasks = async (req, res) => {
  try {
    const incompleteTasks = await Task.find({
      user: req.user.id,
      status: { $ne: "Completed" },
    });
    res.status(200).json({ tasks: incompleteTasks });
  } catch (error) {
    console.error("Get Incomplete Tasks Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Completed", "Incomplete"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Use 'Completed' or 'Incomplete'.",
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({
      message: "Task status updated successfully!",
      task: updatedTask,
    });
  } catch (error) {
    console.error("Update Task Status Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

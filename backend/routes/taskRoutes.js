const express = require("express");
const router = express.Router();
const {
  createTask,
  updateTask,
  getTaskById,
  getAllTasks,
  getCompletedTasks,
  getIncompleteTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controller/taskController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.use(authenticateToken);

router.get("/completed", getCompletedTasks);
router.get("/incomplete", getIncompleteTasks);
router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post("/create", createTask);
router.put("/update/:id", updateTask);
router.put("/update-status/:id", updateTaskStatus);
router.delete("/delete/:id", deleteTask);

module.exports = router;

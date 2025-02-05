import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createTask, getTask, updateTask } from "../services/api"; // Import your API functions

const TaskForm = () => {
  const { id } = useParams(); // If 'id' exists, we're editing
  const isEditing = !!id;
  const navigate = useNavigate(); // To redirect after successful task creation or update

  // ✅ Form State
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    status: "Incomplete",
  });

  // ✅ Fetch Task Data for Edit Mode
  useEffect(() => {
    if (isEditing) {
      const fetchTaskData = async () => {
        try {
          const response = await getTask(id); // Fetch task by ID
          const taskData = response.data.task;

          // Convert dueDate to "YYYY-MM-DD" format
          const formattedDueDate = taskData.dueDate
            ? taskData.dueDate.split("T")[0]
            : "";

          setTask({
            ...taskData,
            dueDate: formattedDueDate, // Set formatted date
          });
        } catch (error) {
          console.error("Error fetching task data:", error);
        }
      };
      fetchTaskData();
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update task if editing
        await updateTask(id, task);
        alert("Task updated successfully!");
      } else {
        // Create task if new
        await createTask(task);
        alert("Task created successfully!");
      }
      navigate("/"); // Redirect to the homepage after successful submission
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Error submitting task. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-800 text-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Task" : "Create Task"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          required
          className="p-2 bg-gray-700 rounded text-white"
        />

        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          required
          className="p-2 bg-gray-700 rounded text-white"
        />

        <div className="flex space-x-4">
          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="p-2 bg-gray-700 rounded text-white"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="p-2 bg-gray-700 rounded text-white"
          />
        </div>

        <select
          name="status"
          value={task.status}
          onChange={handleChange}
          className="p-2 bg-gray-700 rounded text-white"
        >
          <option value="Incomplete">Incomplete</option>
          <option value="Completed">Completed</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 p-2 rounded text-white hover:bg-green-600 transition-all"
        >
          {isEditing ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;

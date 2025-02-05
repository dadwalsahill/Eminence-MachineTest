import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTaskStatus } from "../services/api";

const Cards = ({ tasks = [] }) => {
  const navigate = useNavigate();
  const [taskList, setTaskList] = useState(Array.isArray(tasks) ? tasks : []);
  const [updatingTaskId, setUpdatingTaskId] = useState(null);

  useEffect(() => {
    console.log("Received tasks:", tasks);
    setTaskList(Array.isArray(tasks) ? tasks : []);
  }, [tasks]);

  const handleStatusChange = async (taskId, currentStatus) => {
    const newStatus =
      currentStatus === "Completed" ? "Incomplete" : "Completed";
    setUpdatingTaskId(taskId);

    try {
      await updateTaskStatus(taskId, { status: newStatus });

      // Update the task status in state
      setTaskList((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTaskList((prevTasks) =>
        prevTasks.filter((task) => task._id !== taskId)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {Array.isArray(taskList) && taskList.length === 0 ? (
        <div className="col-span-3 flex justify-center items-center h-64 text-white">
          No Result Found
        </div>
      ) : (
        taskList.map((item, i) => (
          <div
            key={i}
            className="bg-gray-500 rounded-sm p-4 text-white transition-all"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-300 mb-2">{item.description}</p>

            {/* Due Date & Priority */}
            <div className="flex justify-between text-sm font-bold mb-4">
              <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
              <span>Priority: {item.priority}</span>
            </div>

            {/* Button Section */}
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  item.status === "Completed" ? "bg-green-400" : "bg-red-400"
                } p-2 rounded w-3/6 transform transition-all duration-500 ease-in-out ${
                  updatingTaskId === item._id ? "scale-95" : "scale-100"
                }`}
                onClick={() => handleStatusChange(item._id, item.status)}
              >
                {item.status === "Completed"
                  ? "Mark Incomplete"
                  : "Mark Complete"}
              </button>

              <div className="text-white p-2 w-3/6 text-xl font-semibold flex justify-around">
                <button
                  className="hover:text-blue-400 transition"
                  onClick={() => navigate(`/edit-task/${item._id}`)}
                >
                  <FaEdit />
                </button>
                <button
                  className="hover:text-yellow-400 transition"
                  onClick={() => handleDelete(item._id)}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Cards;

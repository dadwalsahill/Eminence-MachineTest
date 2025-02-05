import React, { useState, useEffect } from "react";
import { getCompletedTasks } from "../services/api";
import Cards from "../components/Cards";
import Header from "../components/Header";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getCompletedTasks();
        setTasks(response.data.tasks || []);
        setFilteredTasks(response.data.tasks || []); // Set all tasks initially
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "All") {
      setFilteredTasks(tasks); // Show all tasks
    } else {
      const filtered = tasks.filter((task) => task.priority === filter);
      setFilteredTasks(filtered); // Filter tasks by priority
    }
    setDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <>
      <div className="flex justify-between items-center py-4 px-6">
        <Header />

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <span>{selectedFilter}</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                dropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.23a1 1 0 011.414 0L10 10.586l3.353-3.353a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-gray-700 text-white rounded-md shadow-lg">
              <ul className="space-y-2 p-2">
                {["All", "Low", "Medium", "High"].map((priority) => (
                  <li
                    key={priority}
                    onClick={() => handleFilterChange(priority)}
                    className={`cursor-pointer px-4 py-2 rounded-md hover:bg-gray-600 ${
                      selectedFilter === priority ? "bg-gray-600" : ""
                    }`}
                  >
                    {priority}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Display Cards based on filtered tasks */}
      <Cards tasks={filteredTasks} />
    </>
  );
};

export default CompletedTasks;

import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/":
        return "All Tasks";
      case "/create-task":
        return "Create Task";
      case "/completed-tasks":
        return "Completed Tasks";
      case "/incomplete-tasks":
        return "Incomplete Tasks";
      default:
        return "No Page Found";
    }
  };

  return (
    <div className="text-center py-4">
      <h1 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition-all duration-300">
        {getTitle()}
      </h1>
    </div>
  );
};

export default Header;

import { CgHome } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { logOutUser } from "../services/api";
import ConfirmDialog from "../components/ConfirmDialog";

const Sidebar = () => {
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("userEmail");

  const data = [
    { title: "Home", icon: <CgHome />, link: "/" },
    { title: "Create Tasks", icon: <CiCirclePlus />, link: "/create-task" },
    {
      title: "Completed Tasks",
      icon: <FaCheckDouble />,
      link: "/completed-tasks",
    },
    {
      title: "Incomplete Tasks",
      icon: <TbNotebookOff />,
      link: "/incomplete-tasks",
    },
  ];

  const handleLogout = async () => {
    try {
      await logOutUser();
      dispatch(logout());
      localStorage.removeItem("isLoggedIn");

      document.body.style.opacity = "0.5";
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="h-full border border-gray-500 rounded-xl p-4 bg-gray-800 text-white flex flex-col">
      <div className="d-flex justify-between">
        <h2 className="text-xl font-semibold my-8">
          Task Management Application
        </h2>
        <p className="mb-1 text-gray-400">{userEmail}</p>
      </div>
      <hr className="my-2" />

      <div className="flex flex-col">
        {data.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {item.icon} <span className="ml-2">{item.title}</span>
          </Link>
        ))}
      </div>

      <div className="mt-4">
        <button
          onClick={() =>
            ConfirmDialog(
              "Are you sure?",
              "Do you want to log out?",
              handleLogout
            )
          }
          className="bg-gray-600 w-full p-2 rounded hover:bg-gray-700 transition-all duration-300"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

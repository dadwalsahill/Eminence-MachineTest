import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import CompletedTasks from "./pages/CompletedTasks";
import InCompleteTasks from "./pages/InCompleteTasks";
import TaskForm from "./pages/TaskForm";
import Register from "./pages/Register";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}>
              <Route index element={<AllTasks />} />
              <Route path="/create-task" element={<TaskForm />} />
              <Route path="/edit-task/:id" element={<TaskForm />} />
              <Route path="/completed-tasks" element={<CompletedTasks />} />
              <Route path="/incomplete-tasks" element={<InCompleteTasks />} />
            </Route>
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;

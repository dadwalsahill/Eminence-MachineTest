import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
      console.log("Component mounted");

      const checkAuth = async () => {
        console.log("Checking auth...");
        try {
          const response = await axios.get("/api/users/verify-token", {
            withCredentials: true, // Important to send the cookie
          });
          console.log("Response received:", response); // Log the response for debugging
          if (response.status === 200) {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error during authentication check:", error);
          setIsAuthenticated(false);
        }
      };

      checkAuth();
    }, []);

    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

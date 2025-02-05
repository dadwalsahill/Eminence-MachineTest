import { useState } from "react";
import SignInForm from "../pages/Login"; // Import your Login form
import SignUpForm from "../pages/Register"; // Import your Register form

const AuthForm = () => {
  const [formType, setFormType] = useState("signIn");

  const toggleForm = (type) => {
    if (type !== formType) {
      setFormType(type);
    }
  };

  return (
    <div className="App h-screen flex justify-center items-center bg-gray-200">
      <div
        className={`container w-full max-w-md p-8 bg-white rounded-lg shadow-xl transition-all duration-500 ${
          formType === "signUp" ? "right-panel-active" : ""
        }`}
        id="container"
      >
        {/* SignUp Form */}
        {formType === "signUp" && <SignUpForm />}
        {/* SignIn Form */}
        {formType === "signIn" && <SignInForm />}

        <div className="overlay-container absolute inset-0 flex justify-center items-center bg-transparent">
          <div className="overlay w-full h-full absolute top-0 left-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-all duration-500">
            <div className="overlay-panel flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl mb-3">Welcome Back!</h1>
              <p className="text-lg mb-4">
                To keep connected with us, please log in with your personal
                info.
              </p>
              <button
                className="ghost text-lg px-4 py-2 bg-transparent border border-solid border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg"
                id="signIn"
                onClick={() => toggleForm("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg">
              <h1 className="text-3xl mb-3">Hello, Friend!</h1>
              <p className="text-lg mb-4">
                Enter your personal details and start your journey with us.
              </p>
              <button
                className="ghost text-lg px-4 py-2 bg-transparent border border-solid border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white rounded-lg"
                id="signUp"
                onClick={() => toggleForm("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

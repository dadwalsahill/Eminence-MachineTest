const express = require("express");
const router = express.Router();
const { signup, signin, verifyToken } = require("../controller/userController");
const { body } = require("express-validator");

// Sign up route
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  signup
);

// Sign in route
router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  signin
);
router.get("/verify-token", verifyToken);

module.exports = router;

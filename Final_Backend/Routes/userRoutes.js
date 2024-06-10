const express = require("express");
const { isAuthorized } = require("../Middlewares/isAuthorized.js");
const {
  createUser,
  logInUser,
  logOutUser,
  getAllUsers,
  getCurrentUser,
} = require("../Controllers/userController.js");

const Router = express.Router();

Router.post("/createUser", createUser);
Router.post("/logInUser", logInUser);
Router.get("/logOutUser", logOutUser);
Router.get("/getAllUsers", isAuthorized, getAllUsers);
Router.get("/getCurrentUser", isAuthorized, getCurrentUser);

module.exports = Router;

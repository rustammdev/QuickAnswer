const HomeController = require("../controllers/home.controller");
const route = require("express").Router();

// @desc Home
// @route GET '/'
// @access Public
route.get("/", HomeController);

module.exports = route;

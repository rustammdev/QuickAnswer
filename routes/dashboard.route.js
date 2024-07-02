import { Router } from "express";
import {
  dashboardController,
  dashboardIdController,
} from "../controller/dashboard.controller.js";
import { AuthMiddlware } from "../midlwares/auth.middlware.js";
const route = Router();

// auth middlware
route.use(AuthMiddlware);

// @desc Home
// @route POST '/event'
// @access Private
route.get("/", dashboardController);

route.get("/:id", dashboardIdController);

export default route;

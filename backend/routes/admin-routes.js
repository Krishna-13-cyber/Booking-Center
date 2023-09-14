import express from "express";

import {
  addAdmin,
  getAllAdmins,
  loginAdmin,
  getAdminById,
} from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.get("/", getAllAdmins);
adminRouter.get("/:id", getAdminById);

export default adminRouter;

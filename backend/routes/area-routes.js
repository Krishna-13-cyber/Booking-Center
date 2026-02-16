import express from "express";
import {
  addArea,
  getAllAreas,
  getAreaById,
} from "../controllers/area-controller.js";
import { verifyAdminToken } from "../middleware/auth.js";

const areaRouter = express.Router();

areaRouter.post("/", verifyAdminToken, addArea);
areaRouter.get("/", getAllAreas);
areaRouter.get("/:id", getAreaById);

export default areaRouter;

import express from "express";
import {
  addArea,
  getAllAreas,
  getAreaById,
} from "../controllers/area-controller.js";

const areaRouter = express.Router();

areaRouter.post("/", addArea);
areaRouter.get("/", getAllAreas);
areaRouter.get("/:id", getAreaById);

export default areaRouter;

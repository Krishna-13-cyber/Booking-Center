import Area from "../models/Areas.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import { isBlank } from "../utils/validation.js";

export const addArea = async (req, res, next) => {
  const adminId = req.adminId;

  const { title, description, imageUrl, featured } = req.body;
  if (isBlank(title) || isBlank(description) || isBlank(imageUrl)) {
    return res.status(422).json({ message: "INVALID INPUTS" });
  }

  let area;
  try {
    area = new Area({
      title: title.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      featured,
      admin: adminId,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);

    if (!adminUser) {
      return res.status(404).json({ message: "Admin not found" });
    }

    session.startTransaction();
    await area.save({ session });
    adminUser.addedAreas.push(area);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  if (!area) {
    return res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ area });
};

export const getAllAreas = async (req, res, next) => {
  let areas;
  try {
    areas = await Area.find();
  } catch (err) {
    console.log(err);
  }

  if (!areas) {
    return res.status(500).json({ message: "Request failed" });
  }

  return res.status(200).json({ areas });
};

export const getAreaById = async (req, res, next) => {
  const id = req.params.id;
  let area;
  try {
    area = await Area.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!area) {
    return res.status(404).json({ message: "Invalid Area Id" });
  }
  return res.status(200).json({ area });
};

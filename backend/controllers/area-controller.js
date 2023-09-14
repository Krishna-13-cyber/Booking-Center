import Area from "../models/Areas.js";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import mongoose from "mongoose";

export const addArea = async (req, res, next) => {
  const extractedToken = req.headers.authorization.split(" ")[1];
  if (!extractedToken && extractedToken.trim() === "") {
    return res.status(404).json({ message: "Token not found" });
  }
  //console.log(extractedToken);

  let adminId;

  // verify token
  jwt.verify(extractedToken, process.env.JWT_SECRET, (err, decrypted) => {
    if (err) {
      return res.status(400).json({ message: `${err.message}` });
    } else {
      adminId = decrypted.id;
      return;
    }
  });

  //create new Area
  const { title, description, imageUrl, featured } = req.body;
  if (
    !title &&
    title.trim() === "" &&
    !description &&
    description.trim() == "" &&
    !imageUrl &&
    imageUrl.trim() === ""
  ) {
    return res.status(422).json({ message: "INVALID INPUTS" });
  }

  let area;
  try {
    area = new Area({
      title,
      description,
      imageUrl,
      featured,
      admin: adminId,
    });

    const session = await mongoose.startSession();
    const adminUser = await Admin.findById(adminId);
    session.startTransaction();
    await area.save({ session });
    adminUser.addedAreas.push(area);
    await adminUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  if (!area) {
    res.status(500).json({ message: "Request Failed" });
  }

  return res.status(201).json({ area });
};

export const getAllAreas = async (req, res, next) => {
  let areas;
  try {
    areas = await Area.find();
  } catch (err) {
    // next(err);
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
    res.status(404).json({ message: "Invalid Area Id" });
  }
  res.status(200).json({ area });
};

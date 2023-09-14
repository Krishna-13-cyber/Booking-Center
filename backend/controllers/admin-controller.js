import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Data" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin Already Exists!" });
  }

  let admin;
  const hashedPassword = bcrypt.hashSync(password);

  try {
    // user = new User({ name, email, password: hashedPassword });
    admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
  } catch (err) {
    console.log(err);
  }

  if (!admin) {
    res.status(500).json({ message: "Unable to add admin" });
  }
  return res.status(201).json({ admin });
};

export const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingAdmin) {
    return res.status(404).json({ message: "Admin Not Found Please Register" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  const token = jwt.sign({ id: existingAdmin._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return res
    .status(200)
    .json({ message: " Admin Login Successful", token, id: existingAdmin._id });
};

export const getAllAdmins = async (req, res, next) => {
  let admin;
  try {
    admin = await Admin.find();
  } catch (err) {
    // next(err);
    console.log(err);
  }

  if (!admin) {
    return res.status(500).json({ message: "Request failed" });
  }

  return res.status(200).json({ admin });
};

export const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedAreas");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

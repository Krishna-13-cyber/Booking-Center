import Booking from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { isBlank, isInvalidEmail } from "../utils/validation.js";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }

  return res.status(200).json({ users });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (isBlank(name) || isInvalidEmail(email) || isBlank(password)) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email.trim() });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({ message: "User Already Exists" });
  }

  const hashedPassword = bcrypt.hashSync(password.trim());
  let user;
  try {
    user = new User({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });
    user = await user.save();
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(201).json({ id: user._id });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  if (isBlank(name) || isInvalidEmail(email) || isBlank(password)) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  const hashedPassword = bcrypt.hashSync(password.trim());
  let user;
  try {
    user = await User.findByIdAndUpdate(
      id,
      {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
      },
      { new: true }
    );
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Updated Succesfully", user });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted Succesfully" });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (isInvalidEmail(email) || isBlank(password)) {
    return res.status(422).json({ message: "Invalid Data" });
  }

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email.trim() });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found Please Register" });
  }

  const isPasswordCorrect = bcrypt.compareSync(
    password.trim(),
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }

  return res
    .status(200)
    .json({ message: "Login Successful", id: existingUser._id });
};

export const getAllBookingOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Booking.find({ user: id }).populate("area user");
  } catch (err) {
    console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to Find any Bookings" });
  }
  return res.status(200).json({ bookings });
};

export const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};

import Booking from "../models/Bookings.js";
import Area from "../models/Areas.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const newBooking = async (req, res, next) => {
  const { area, date, seatNo, user } = req.body;
  let booking;

  let existingArea;
  let existingUser;

  try {
    existingArea = await Area.findById(area);
    existingUser = await User.findById(user);
  } catch (err) {
    console.log(err);
  }
  if (!existingArea) {
    return res.status(404).json({ message: "Area not found" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    booking = new Booking({
      area,
      date: new Date(`${date}`),
      seatNo,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingArea.bookings.push(booking);
    await existingUser.save({ session });
    await existingArea.save({ session });
    await booking.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: " Unable to create a new Booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!booking) {
    return res.status(404).json({ message: "Invalid Booking Id" });
  }
  return res.status(200).json({ booking });
};

export const deleteBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndRemove(id).populate("user area");

    if (!booking) {
      return res.status(404).json({ message: "Unable to Delete" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.area.bookings.pull(booking);
    await booking.area.save({ session });
    await booking.user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
  }

  if (!booking) {
    return res.status(404).json({ message: "Unable to Delete" });
  }

  return res.status(200).json({ message: "Deleted Successfully" });
};

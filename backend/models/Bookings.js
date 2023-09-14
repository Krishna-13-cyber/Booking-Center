import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  area: {
    type: mongoose.Types.ObjectId,
    ref: "Areas",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  // This must me converted into time
  
  seatNo: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export default mongoose.model("Booking", bookingSchema);

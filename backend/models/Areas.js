import mongoose, { Mongoose } from "mongoose";
const Schema = mongoose.Schema;

const areaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
  },
  bookings: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Bookings",
    },
  ],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Areas", areaSchema);

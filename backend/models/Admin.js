import mongoose from "mongoose";
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: true,
  },
  addedAreas: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Areas",
    },
  ],
});

export default mongoose.model("Admin", adminSchema);

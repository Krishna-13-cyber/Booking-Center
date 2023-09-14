import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import areaRouter from "./routes/area-routes.js";
import bookingsRouter from "./routes/booking-routes.js";
import cors from "cors";
const app = express();
dotenv.config();

// middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/areas", areaRouter);
app.use("/booking", bookingsRouter);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(8800, () => {
      console.log(`Connected To MongoDB`);
      console.log(`Connected To Localhost Port ${8800}`);
    })
  )
  .catch((e) => {
    console.log(e);
  });

// app.use("/", (req, res, next) => {
//   res.send("Hi");
// });

import "dotenv/config";
import "./database/connectdb.js";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

const PORT = process.env.PORT || 3300;
app.listen(PORT, () =>
  console.log("----------- Listening http://localhost:" + PORT)
);

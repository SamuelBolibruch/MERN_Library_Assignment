import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import bookRoutes from "./routes/book.route.js";
import readerRoutes from "./routes/reader.route.js";
import loanRoutes from "./routes/loan.route.js";
import { createConnection } from "mongoose";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("WELCOME TO BOOK API!");
});

app.use("/api/books", bookRoutes);
app.use("/api/readers", readerRoutes);
app.use("/api/loans", loanRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port 5000`);
  connectMongoDB();
});

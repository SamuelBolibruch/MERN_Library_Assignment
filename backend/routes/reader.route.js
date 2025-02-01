import express from "express";
import { addReader, getReaders, editReader } from "../controllers/reader.controller.js";

const router = express.Router();

router.get("/", getReaders);
router.post("/", addReader);
router.put("/:id", editReader)

export default router;

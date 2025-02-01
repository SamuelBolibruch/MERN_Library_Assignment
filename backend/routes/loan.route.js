import express from "express";
import {
  createLoan,
  getLoans,
  returnLoan,
} from "../controllers/loan.controller.js";

const router = express.Router();

router.get("/", getLoans);
router.post("/", createLoan);
router.put("/:id", returnLoan);

export default router;

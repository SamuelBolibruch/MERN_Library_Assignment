import express from "express";
import {
  addBook,
  getAllBooks,
  getBooksByAuthor,
  editBook,
} from "../controllers/book.controller.js";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", addBook);
router.put("/:id", editBook);
router.get("/:author", getBooksByAuthor);

export default router;

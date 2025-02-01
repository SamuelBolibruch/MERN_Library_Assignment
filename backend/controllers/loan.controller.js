import Reader from "../models/reader.model.js";
import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js";
import mongoose from "mongoose";
import e from "express";

export const getLoans = async (req, res) => {
  try {
    const allLoans = await Loan.find().populate("loaner").populate("book");
    return res.status(200).json(allLoans);
  } catch (error) {
    console.log("Error in getLoans controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { loaner, book } = req.body;
    const loanDate = new Date();

    if (!loaner || !book) {
      return res.status(400).json({ error: "Please provide loaner and book" });
    }

    if (!mongoose.isValidObjectId(loaner) || !mongoose.isValidObjectId(book)) {
      return res.status(400).json({ error: "Invalid user or book ID format." });
    }

    const existingLoaner = await Reader.findById(loaner);
    const existingBook = await Book.findById(book);

    if (!existingLoaner || !existingBook) {
      return res.status(404).json({ error: "Loaner or book not found." });
    }

    if (existingBook.isBorrowed) {
      return res.status(400).json({ error: "Book is already borrowed." });
    } else {
      const newLoan = new Loan({
        loaner,
        book,
        loanDate,
      });

      await newLoan.save();

      existingBook.isBorrowed = true;
      await existingBook.save();

      const populatedLoan = await Loan.findById(newLoan._id)
        .populate("book") // Načítaj detaily o knihe
        .populate("loaner")
        .exec(); // Načítaj detaily o čitateľovi

      return res.status(200).json({ loan: populatedLoan });
    }
  } catch (error) {
    console.log("Error in toggleLoan controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const returnLoan = async (req, res) => {
  try {
    const id = req.params.id;
    const loan = await Loan.findById(id);
    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    const book = await Book.findById(loan.book);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    loan.returnDate = new Date();
    loan.save();

    book.isBorrowed = false;
    book.save();

    const loanWithDetails = await Loan.findById(id)
      .populate("book")
      .populate("loaner");

    return res.status(200).json(loanWithDetails);
  } catch (error) {
    console.log("Error in returnLoan controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

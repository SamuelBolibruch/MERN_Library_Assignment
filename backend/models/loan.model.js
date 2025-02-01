import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    loaner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reader",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    loanDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Loan = mongoose.model("Loan", loanSchema);

export default Loan;

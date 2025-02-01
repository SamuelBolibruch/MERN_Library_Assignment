import mongoose from "mongoose";

const readerSchema = new mongoose.Schema({
  cardNumberId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

const Reader = mongoose.model("Reader", readerSchema);

export default Reader;

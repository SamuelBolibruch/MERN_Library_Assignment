import Book from "../models/book.model.js";
import Loan from "../models/loan.model.js"; // nezabudol si importovať model Loan

export const getAllBooks = async (req, res) => {
  try {
    let allBooks = await Book.find();

    let allBooksCopy = await Promise.all(
      allBooks.map(async (book) => {
        const bookObject = book.toObject(); // Prevedenie Mongoose dokumentu na obyčajný objekt

        // Získanie informácií o požičaní
        const loan = await Loan.findOne({
          book: bookObject._id,
          returnDate: { $exists: false },
        }).populate("loaner");

        console.log("Loan:", loan); // Skontroluj, čo vracia Loan

        if (loan) {
          bookObject.loaner = loan.loaner ? loan.loaner : null; // Ak je kniha požičaná, pripojíme loan, inak null
        }
        return bookObject;
      })
    );

    return res.status(200).json(allBooksCopy);
  } catch (error) {
    console.log("Error in getAllBooks controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, author } = req.body;

    if (!name || !author) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existingBook = await Book.findOne({ name });

    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const book = new Book({
      name,
      author,
    });

    const newBook = await book.save();

    if (!newBook) {
      return res.status(400).json({ error: "Book not added" });
    }
    res.status(201).json(newBook);
  } catch (error) {
    console.log("Error in addBook controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.params;
    const booksById = await Book.find({ author });
    res.status(200).json(booksById);
  } catch (error) {
    console.log("Error in getBooksByAuthor controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author } = req.body;

    if (!name || !author || !id) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    book.name = name;
    book.author = author;

    const updatedBook = await book.save();

    if (!updatedBook) {
      return res.status(400).json({ error: "Book not updated" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log("Error in editReader controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

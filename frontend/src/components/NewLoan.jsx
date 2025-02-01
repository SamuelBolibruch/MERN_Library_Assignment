import { useEffect, useState } from "react";
import { useBookStore } from "../store/useBookStore";
import { useReaderStore } from "../store/useReaderStore";
import { useLoanStore } from "../store/useLoanStore";

const NewLoan = () => {
  const [selectedReader, setSelectedReader] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  const { books, getBooks } = useBookStore();
  const { readers, getReaders } = useReaderStore();
  const { createLoan } = useLoanStore();

  useEffect(() => {
    getBooks();
    getReaders();
  }, [getBooks, getReaders]);

  const handleReaderChange = (event) => {
    setSelectedReader(event.target.value); // Uložíme vybraného čitateľa
  };

  const handleBookChange = (event) => {
    setSelectedBook(event.target.value); // Uložíme vybranú knihu
  };

  const handleBorrowSubmit = async () => {
    if (!selectedReader || !selectedBook) {
      alert("Both fields are required!");
      return;
    }

    await createLoan({ loaner: selectedReader, book: selectedBook });
    setSelectedReader(null);
    setSelectedBook(null);
  };

  return (
    <div className="bg-base-100 p-4 rounded-box shadow-md">
      <select
        className="select select-bordered w-full"
        value={selectedReader || ""}
        onChange={handleReaderChange}
      >
        <option disabled value="">
          Select reader
        </option>
        {readers.map((reader) => {
          return (
            <option key={reader._id} value={reader._id}>
              {reader.firstName} {reader.lastName}
            </option>
          );
        })}
      </select>

      <select
        className="select select-bordered w-full mt-4"
        value={selectedBook || ""}
        onChange={handleBookChange}
      >
        <option disabled value="">
          Select book
        </option>
        {books.map((book) => {
          if (book.isBorrowed) {
            return null;
          }

          return (
            <option key={book._id} value={book._id}>
              {book.name}
            </option>
          );
        })}
      </select>

      <button
        type="submit"
        className="btn btn-primary mt-4 w-full"
        onClick={handleBorrowSubmit}
      >
        Borrow a book
      </button>
    </div>
  );
};

export default NewLoan;

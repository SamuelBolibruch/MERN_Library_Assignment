import { BookOpen } from "lucide-react";
import { useBookStore } from "../store/useBookStore";
import { useEffect, useRef, useState } from "react";
import NewBook from "../components/NewBook";
import { useLoanStore } from "../store/useLoanStore";

const AllBooks = () => {
  const { books, getBooks } = useBookStore();
  // const { returnLoan } = useLoanStore();
  const [bookToEdit, setBookToEdit] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    getBooks();
  }, [getBooks]);

  return (
    <div className="flex-grow w-full flex justify-center bg-base-200">
      <div className="flex flex-col">
        <div className="mt-10 min-w-1/3">
          <NewBook type="add" />
        </div>

        <div className="mt-10 min-w-1/3">
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Books in our library
            </li>

            {books.map((book, index) => {
              return (
                <li key={book._id} className="list-row">
                  <div className="text-2xl md:text-4xl font-thin opacity-30 tabular-nums">
                    {index < 10 ? "0" + (index + 1) : index + 1}
                  </div>
                  <div className="my-auto">
                    <BookOpen className="sm:md:size-5 md:size-10 mx-2 rounded-box" />
                  </div>
                  <div className="list-col-grow">
                    <div>{book.name}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {book.author}
                    </div>
                  </div>
                  <div className={"my-auto flex flex-col justify-center"}>
                    <div
                      className={`flex justify-end ${
                        book.isBorrowed
                          ? "text-red-500"
                          : "text-green-500 opacity-50"
                      }`}
                    >
                      {book.isBorrowed ? "Borrowed" : "Available"}
                    </div>

                    <div className="text-xs opacity-60">
                      {book.isBorrowed &&
                        book.loaner &&
                        book.loaner.firstName + " " + book.loaner.lastName}
                    </div>
                  </div>

                  <div
                    className="hover:text-green-300 hover:cursor-pointer ml-4 my-auto"
                    onClick={() => {
                      setBookToEdit(book);
                      document.getElementById("my_modal_1").showModal();
                    }}
                  >
                    Edit
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mx-4">Edit Book:</h3>
          <NewBook bookToEdit={bookToEdit} type="edit" modalRef={modalRef} />
        </div>
      </dialog>
    </div>
  );
};

export default AllBooks;

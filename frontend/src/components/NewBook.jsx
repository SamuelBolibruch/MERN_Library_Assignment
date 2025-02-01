/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useBookStore } from "../store/useBookStore.js";

const NewBook = (props) => {
  const { bookToEdit, type, modalRef } = props;

  const [formData, setFormData] = useState({
    name: "",
    author: "",
  });

  const { addBook, editBook } = useBookStore();

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmitAddBook = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.author) {
      alert("Both fields are required!");
      return;
    }

    addBook(formData);

    setFormData({
      name: "",
      author: "",
    });
  };

  const handleFormSubmitEditBook = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.author) {
      alert("Both fields are required!");
      return;
    }

    editBook(bookToEdit._id, formData);

    setFormData({
      name: "",
      author: "",
    });

    // Zavrie modal po úspešnom odoslaní
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  useEffect(() => {
    setFormData({
      name: bookToEdit?.name || "",
      author: bookToEdit?.author || "",
    });
  }, [bookToEdit]);

  return (
    <div className="bg-base-100 p-4 rounded-box shadow-md">
      <form
        onSubmit={
          type === "add" ? handleFormSubmitAddBook : handleFormSubmitEditBook
        }
      >
        <div className="flex gap-4 flex-col">
          <label className="input input-bordered flex items-center gap-2 w-full">
            Book Name
            <input
              type="text"
              value={formData.name}
              onChange={handleFormInput}
              className="grow"
              name="name"
              placeholder="Harry Potter"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            Author
            <input
              type="text"
              value={formData.author}
              onChange={handleFormInput}
              className="grow"
              name="author"
              placeholder="J. K. Rowling"
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBook;

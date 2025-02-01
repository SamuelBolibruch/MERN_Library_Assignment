/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useReaderStore } from "../store/useReaderStore";

const NewReader = (props) => {
  const { readerToEdit, type, modalRef } = props;
  const { addReader, editReader } = useReaderStore();
  const [startDate, setStartDate] = useState(new Date("1900-01-01"));

  const [formData, setFormData] = useState({
    cardNumberId: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmitAddReader = (e) => {
    e.preventDefault();

    if (
      !formData.cardNumberId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate
    ) {
      alert("All fields are required!");
      return;
    }

    addReader(formData);

    setFormData({
      cardNumberId: "",
      firstName: "",
      lastName: "",
      birthDate: "",
    });
  };

  const handleFormSubmitEditReader = (e) => {
    e.preventDefault();

    if (
      !formData.cardNumberId ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.birthDate
    ) {
      alert("All fields are required!");
      return;
    }

    console.log("Edit reader", formData);
    editReader(readerToEdit._id, formData);

    setFormData({
      cardNumberId: "",
      firstName: "",
      lastName: "",
      birthDate: "",
    });

    // Zavrie modal po úspešnom odoslaní
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      birthDate: startDate ? formatDate(startDate) : "1900-01-01",
    }));
  }, [startDate]);

  useEffect(() => {
    if (readerToEdit?.birthDate) {
      setStartDate(new Date(readerToEdit.birthDate)); // Priamo na objekt Date
    }
    setFormData({
      cardNumberId: readerToEdit?.cardNumberId || "",
      firstName: readerToEdit?.firstName || "",
      lastName: readerToEdit?.lastName || "",
      birthDate: readerToEdit?.birthDate || "",
    });
  }, [readerToEdit]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Mesiac je indexovaný od 0, preto pripočítame 1
    const day = ("0" + date.getDate()).slice(-2); // Dátum musí byť vždy dvojciferný

    return `${year}-${month}-${day}`;
  };

  return (
    <div className="bg-base-100 p-4 rounded-box shadow-md">
      <form
        onSubmit={
          type === "add"
            ? handleFormSubmitAddReader
            : handleFormSubmitEditReader
        }
      >
        <div className="flex gap-4 flex-col">
          <label className="input input-bordered flex items-center gap-2 w-full">
            Card Number ID
            <input
              type="text"
              value={formData.cardNumberId}
              onChange={handleFormInput}
              className="grow"
              name="cardNumberId"
              placeholder="CD123456"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            First Name
            <input
              type="text"
              value={formData.firstName}
              onChange={handleFormInput}
              className="grow"
              name="firstName"
              placeholder="John"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            Last Name
            <input
              type="text"
              value={formData.lastName}
              onChange={handleFormInput}
              className="grow"
              name="lastName"
              placeholder="Doe"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-full">
            Birth Date
            <DatePicker
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date) => setStartDate(date)}
            />
          </label>

          <button type="submit" className="btn btn-primary">
            {type === "add" ? "Add Reader" : "Edit Reader"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewReader;

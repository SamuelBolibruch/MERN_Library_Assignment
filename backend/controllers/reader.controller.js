import Reader from "../models/reader.model.js";

export const getReaders = async (req, res) => {
  try {
    const allReaders = await Reader.find();
    return res.status(200).json(allReaders);
  } catch (error) {
    console.log("Error in getReaders controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addReader = async (req, res) => {
  try {
    const { cardNumberId, firstName, lastName, birthDate } = req.body;

    if (!cardNumberId || !firstName || !lastName || !birthDate) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const existingReader = await Reader.findOne({ cardNumberId });

    if (existingReader) {
      return res.status(400).json({ error: "Reader already exists" });
    }

    // Preveď birthDate na Date objekt
    const formattedBirthDate = new Date(birthDate);

    // Skontroluj, či prevod prebehol správne (ak nie, bude to invalid date)
    if (isNaN(formattedBirthDate)) {
      return res.status(400).json({ error: "Invalid birthDate format" });
    }

    const reader = new Reader({
      cardNumberId,
      firstName,
      lastName,
      birthDate: formattedBirthDate,
    });

    const newReader = await reader.save();

    if (!newReader) {
      return res.status(400).json({ error: "Reader not added" });
    }
    res.status(201).json(newReader);
  } catch (error) {
    console.log("Error in addReader controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const editReader = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardNumberId, firstName, lastName, birthDate } = req.body;

    if (!cardNumberId || !firstName || !lastName || !birthDate) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }

    const reader = await Reader.findById(id);

    if (!reader) {
      return res.status(404).json({ error: "Reader not found" });
    }

    // Preveď birthDate na Date objekt
    const formattedBirthDate = new Date(birthDate);

    // Skontroluj, či prevod prebehol správne (ak nie, bude to invalid date)
    if (isNaN(formattedBirthDate)) {
      return res.status(400).json({ error: "Invalid birthDate format" });
    }

    reader.cardNumberId = cardNumberId;
    reader.firstName = firstName;
    reader.lastName = lastName;
    reader.birthDate = formattedBirthDate;

    const updatedReader = await reader.save();

    if (!updatedReader) {
      return res.status(400).json({ error: "Reader not updated" });
    }
    res.status(200).json(updatedReader);
  } catch (error) {
    console.log("Error in editReader controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

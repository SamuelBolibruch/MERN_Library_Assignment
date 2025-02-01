import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useBookStore = create((set, get) => ({
  books: [],
  selectedBook: null,
  isBooksLoading: false,
  isBookAdding: false,
  isBookEditing: false,

  getBooks: async () => {
    set({ isBooksLoading: true });
    try {
      const res = await axiosInstance.get("/books");
      set({ books: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch books");
    } finally {
      set({ isBooksLoading: false });
    }
  },

  setBooks: (updatedBooks) => {
    set({ books: updatedBooks });
  },

  addBook: async (data) => {
    set({ isBookAdding: true });
    const { books } = get();
    try {
      const res = await axiosInstance.post("/books", data);
      set({ books: [...books, res.data] });
      toast.success("Book added successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add book");
    } finally {
      set({ isBookAdding: false });
    }
  },

  editBook: async (id, data) => {
    set({ isBookEditing: true });
    const { books } = get();
    try {
      const res = await axiosInstance.put(`/books/${id}`, data);
      const updatedBooks = books.map((book) =>
        book._id === id ? res.data : book
      );
      set({ books: updatedBooks });
      toast.success("Book edited successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to edit reader");
    } finally {
      set({ isBookEditing: false });
    }
  },
}));

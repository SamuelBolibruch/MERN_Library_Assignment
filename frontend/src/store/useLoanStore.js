import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import { useBookStore } from "./useBookStore";

export const useLoanStore = create((set, get) => ({
  loans: [],
  isLoansLoading: false,
  isLoanReturning: false,

  getLoans: async () => {
    set({ isLoansLoading: true });
    try {
      const res = await axiosInstance.get("/loans");
      set({ loans: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch loans");
    } finally {
      set({ isLoansLoading: false });
    }
  },

  createLoan: async (data) => {
    set({ isLoanCreating: true });
    const { loans } = get();
    const { books, setBooks } = useBookStore.getState(); // Získame stav kníh
    try {
      const res = await axiosInstance.post("/loans", data);
      set({ loans: [...loans, res.data.loan] });
      toast.success("Loan created successfully 🎉");

      // 🟢 Nájdeme knihu podľa ID a nastavíme isBorrowed na true
      const updatedBooks = books.map((book) => {
        if (book._id == data.book) {
          return { ...book, isBorrowed: true };
        }
        return book;
      });

      setBooks(updatedBooks); // Aktualizujeme stav kníh
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create loan");
    } finally {
      set({ isLoanCreating: false });
    }
  },

  returnLoan: async (id) => {
    set({ isLoanReturning: true });
    const { loans } = get();
    try {
      const res = await axiosInstance.put(`/loans/${id}`);

      // Nahradíme starý loan novým loan z odpovede
      const updatedLoans = loans.map((loan) =>
        loan._id === res.data._id ? res.data : loan
      );

      // Aktualizujeme stav s novými údajmi o požičaných knihách
      set({ loans: updatedLoans });

      toast.success("Loan returned successfully 🎉");
    } catch (error) {
      toast.error(error || "Failed to return loan");
    } finally {
      set({ isLoanReturning: false });
    }
  },
}));

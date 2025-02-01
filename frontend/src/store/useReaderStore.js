import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";

export const useReaderStore = create((set, get) => ({
  readers: [],
  isReadersLoading: false,
  isReaderAdding: false,
  isReaderEditing: false,

  getReaders: async () => {
    set({ isReadersLoading: true });
    try {
      const res = await axiosInstance.get("/readers");
      set({ readers: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch readers");
    } finally {
      set({ isReadersLoading: false });
    }
  },

  addReader: async (data) => {
    set({ isReaderAdding: true });
    const { readers } = get();
    try {
      const res = await axiosInstance.post("/readers", data);
      set({ readers: [...readers, res.data] });
      toast.success("Reader added successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add reader");
    } finally {
      set({ isReaderAdding: false });
    }
  },

  editReader: async (id, data) => {
    set({ isReaderEditing: true });
    const { readers } = get();
    try {
      const res = await axiosInstance.put(`/readers/${id}`, data);
      const updatedReaders = readers.map((reader) =>
        reader._id === id ? res.data : reader
      );
      set({ readers: updatedReaders });
      toast.success("Reader edited successfully 🎉");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to edit reader");
    } finally {
      set({ isReaderAdding: false });
    }
  },
}));

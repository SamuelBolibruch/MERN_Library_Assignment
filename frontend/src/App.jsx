import { Routes, Route } from "react-router-dom";
import AllBooks from "./pages/AllBooks";
import Readers from "./pages/Readers";
import Loans from "./pages/Loans";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<AllBooks />} />
          <Route path="/readers" element={<Readers />} />
          <Route path="/loans" element={<Loans />} />
        </Routes>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;

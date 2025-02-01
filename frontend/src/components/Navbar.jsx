import { LibraryBig, Users, ArchiveRestore } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className=" width-full bg-primary h-auto p-5">
      <div className="container mx-auto max-w-2xl h-full">
        <div className="flex flex-col md:flex-row justify-between items-center h-full gap-6">
          <div className="flex items-center">
            <Link to="/" className="flex flex-row gap-2">
              <LibraryBig className="my-auto" />
              <h1 className="font-bold text-2xl">Books</h1>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/readers" className="flex flex-row gap-2">
              <Users className="my-auto" />
              <h1 className="font-bold text-2xl">Readers</h1>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/loans" className="flex flex-row gap-2">
              <ArchiveRestore className="my-auto" />
              <h1 className="font-bold text-2xl">Loans</h1>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

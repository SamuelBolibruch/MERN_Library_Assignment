import { useEffect } from "react";
import { useLoanStore } from "../store/useLoanStore";
import { BookImage } from "lucide-react";
import NewLoan from "../components/NewLoan";

const Loans = () => {
  const { loans, getLoans, returnLoan } = useLoanStore();

  useEffect(() => {
    getLoans();
  }, [getLoans]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Mesiac je 0-indexovaný
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleReturnBook = (id) => {
    returnLoan(id);
  };

  useEffect(() => {
    console.log(loans); // Skontroluj, či sa v `loans` nachádzajú aktuálne hodnoty
  }, [loans]);

  return (
    <div className="flex-grow w-full flex justify-center bg-base-200">
      <div className="flex flex-col">
        <div className="mt-10 min-w-1/3">
          <NewLoan />
        </div>

        <div className="mt-10 min-w-[50vw]">
          <ul className="list bg-base-100 rounded-box shadow-md w-full">
            <li className="mx-2 pb-2 py-5 text-xs opacity-60 flex">
              <div className="flex-[1] text-center">Loans</div>
              <div className="flex-[2]">Book name</div>
              <div className="flex-[2]">Loaner</div>
              <div className="flex-[2]">Borrow Date</div>
              <div className="flex-[2]">Return Date</div>
            </li>

            {loans.reverse().map((loan, index) => {
              // if (loan.returnDate) {
              //   return null; // Ak je returnDate definovaný, nič sa nevykreslí
              // }

              return (
                <li
                  key={loan._id}
                  className={`flex flex-row py-5 mx-2 ${
                    index === loans.length - 1
                      ? ""
                      : "border-b-1 border-gray-700"
                  }`}
                >
                  <button
                    className={`flex-[1] ${
                      loan.returnDate ? "disabled opacity-50" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      !loan.returnDate ? handleReturnBook(loan._id) : "";
                    }}
                  >
                    <BookImage className="sm:md:size-5 md:size-10 mx-2 rounded-box" />
                  </button>
                  <div className="flex-[2] ">{loan.book.name}</div>
                  <div className="flex-[2] ">
                    {loan.loaner.firstName} {loan.loaner.lastName}
                  </div>
                  <div className="flex-[2] ">{formatDate(loan.loanDate)}</div>
                  <div className="flex-[2] ">
                    {loan.returnDate && formatDate(loan.loanDate)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Loans;

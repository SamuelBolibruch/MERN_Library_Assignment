import { useEffect, useRef, useState } from "react";
import NewReader from "../components/NewReader";
import { useReaderStore } from "../store/useReaderStore";
import { UserRound } from "lucide-react";

const Readers = () => {
  const { readers, getReaders } = useReaderStore();
  const [readerToEdit, setReaderToEdit] = useState(null);

  const modalRef = useRef(null);

  useEffect(() => {
    getReaders();
  }, []);

  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // Funkcia, ktorá nastaví readerToEdit na null pri zatvorení
    const handleClose = () => {
      setReaderToEdit(null); // Nastaví readerToEdit na null pri zatvorení
      console.log("Modal closed");
    };

    modal.addEventListener("close", handleClose);
    return () => modal.removeEventListener("close", handleClose);
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Ak je null alebo undefined, vráti prázdny string
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Extrahuje len časť 'yyyy-MM-dd'
  };

  return (
    <div className="flex-grow w-full flex justify-center bg-base-200">
      <div className="flex flex-col">
        <div className="mt-10 min-w-1/3">
          <NewReader type="add" />
        </div>

        <div className="mt-10 min-w-1/3">
          <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
              Books in our library
            </li>

            {readers.map((reader) => {
              return (
                <li key={reader._id} className="list-row">
                  <div className="text-2xl md:text-4xl font-thin opacity-30 tabular-nums my-auto">
                    {formatDate(reader.birthDate)}
                  </div>
                  <div className="my-auto">
                    <UserRound className="size-5 md:size-10 mx-2 rounded-box" />
                  </div>
                  <div className="list-col-grow">
                    <div>{reader.firstName + " " + reader.lastName}</div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {reader.cardNumberId}
                    </div>
                  </div>
                  <div
                    className="hover:text-green-300 hover:cursor-pointer my-auto"
                    onClick={() => {
                      setReaderToEdit(reader);
                      document.getElementById("my_modal_2").showModal();
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

      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mx-4">
            Edit Reader:{" "}
            {readerToEdit
              ? readerToEdit.firstName + " " + readerToEdit.lastName
              : ""}
          </h3>
          <NewReader
            readerToEdit={readerToEdit}
            type="edit"
            modalRef={modalRef}
          />
        </div>
      </dialog>
    </div>
  );
};

export default Readers;

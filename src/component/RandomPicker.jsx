import { useState, useEffect } from "react";
import { Context } from "../context/StateContext";
import { DefaultButton } from "./ClassName";
import { toast } from "react-hot-toast";

const RandomPicker = () => {
  const { participants, winner, setWinner, csvData, prize, prize_place } =
    Context();

  const [items, setItems] = useState(csvData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [show, setShow] = useState(false);
  const [blur, setBlur] = useState("");
  const [start, setStart] = useState(DefaultButton);
  const [stop, setStop] = useState(DefaultButton);
  const [place, setPlace] = useState(0);
  const [image, setImage] = useState(0);

  const add_prize = prize_place[image]?.prize_name;

  useEffect(() => {
    let intervalId;

    if (isPicking) {
      intervalId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * items?.length);
        const randomItem = items[randomIndex];
        setSelectedItem(randomItem);
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPicking, items, selectedItem, winner?.length]);

  const startPicking = () => {
    if (items !== null) {
      if (place < participants && prize.length !== 0) {
        setIsPicking(true);
        setBlur("blur-[2.5px]");
        setStart(
          "border-[#1dab37] bg-gradient-to-b from-[#1dab37] via-[#00ff2f] to-[#1dab37]"
        );
        setStop(DefaultButton);
      } else if (participants === 0) {
        toast.error("Mohon setting jumlah pemenang");
      } else if (prize_place[0].prize_name === "") {
        toast.error("Mohon setting hadiah dahulu");
      }
    } else if (items === null) {
      toast.error("Mohon isi daftar peserta terlebih dahulu");
    }
  };

  const stopPicking = () => {
    setIsPicking(false);
    setBlur("blur-none");
    setStart(DefaultButton);
    setStop(
      "border-[#ab1d1d] bg-gradient-to-b from-[#ab1d1d] via-[#ff0000] to-[#ab1d1d] rounded"
    );

    const updatedSelectedItem = {
      ...selectedItem,
      prize: add_prize,
    };

    setWinner([...winner, updatedSelectedItem]);

    if (selectedItem) {
      const updatedItems = [...items];
      updatedItems.splice(selectedItem.index, 1);
      setItems(updatedItems);
    }
    setPlace(place + 1);
    setShow(true);
  };

  const handleClose = () => {
    if (place == participants) {
      toast.success("Undian Selesai!");
      setShow(false);
      setStop(DefaultButton);
    } else {
      setShow(false);
      setImage(image + 1);
    }
  };

  return (
    <div className="">
      <div className="flex justify-center py-10">
        <img src={prize_place[image]?.image} className="h-48" />
      </div>
      <div className="flex flex-col items-center gap-5 ">
        <div
          className={`flex justify-center items-center font-bold text-2xl rounded-3xl w-[55vw] h-20 border-[6px] border-[#ebb102] bg-white`}
        >
          <p className={blur}>{selectedItem ? selectedItem.order_id : ""}</p>
        </div>
        <div className="flex gap-5 text-xl text-white font-bold">
          <button
            onClick={startPicking}
            disabled={isPicking}
            className={`w-32 border py-2 rounded ${start}`}
          >
            Start
          </button>
          <button
            onClick={stopPicking}
            disabled={!isPicking}
            className={`w-32 border py-2 rounded ${stop}`}
          >
            Stop
          </button>
        </div>
      </div>

      {/* POPUP */}
      {show && (
        <div className="fixed flex items-center justify-center h-screen w-full top-0 left-0">
          <div
            onClick={handleClose}
            className="absolute h-screen w-full bg-[#000000]/[0.2] z-[-1]"
          />
          <div className="animate-zoom-out relative flex flex-col bg-white w-[70vw] h-[50vh] rounded z-[1]">
            <h1 className="absolute top-7 inset-x-0 text-center text-3xl font-bold">
              Pemenang ke-{place}
            </h1>
            <div className="flex flex-col items-center justify-center font-bold h-full">
              <div>
                <p className="text-5xl">{selectedItem.order_id}</p>
              </div>
              <p className="text-3xl mt-8">{selectedItem.nama_customer}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomPicker;

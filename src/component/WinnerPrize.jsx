import { useEffect, useState } from "react";
import { Context } from "../context/StateContext";
import { inputClass } from "./ClassName";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-hot-toast";

const WinnerPrize = () => {
  const {
    participants,
    setParticipants,
    prize,
    prize_place,
    setPrize_place,
    change,
    setChange,
    prize_image,
    setPrize_image,
  } = Context();

  const [show, setShow] = useState(false);
  const [item_index, setItem_index] = useState(0);

  const HandleEdit = (index) => {
    if (prize.length !== 0) {
      setShow(true);
      setItem_index(index);
    } else {
      toast.error("Harap isi jenis hadiah");
    }
  };

  const HandleChange = (e) => {
    const value = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;
    setChange(selectedText);
    setPrize_image(value);
  };

  const HandleSelect = () => {
    const updatedPrizePlace = [...prize_place];
    updatedPrizePlace[item_index].prize_name = change;
    updatedPrizePlace[item_index].image = prize_image;
    setPrize_place(updatedPrizePlace);

    setShow(false);
  };

  useEffect(() => {
    const initializePrizePlace = (count) => {
      const initialPrizePlace = [];
      for (let i = 0; i < count; i++) {
        initialPrizePlace.push({
          prize_place: i + 1,
          prize_name: prize_place[i]?.prize_name || "",
          image: "",
        });
      }
      return initialPrizePlace;
    };
    //
    const initialPrizePlace = initializePrizePlace(parseInt(participants, 10));
    setPrize_place(initialPrizePlace);
  }, [participants, setPrize_place]);

  return (
    <div className="flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-2 w-[20%]">
        <div className="flex">
          <p>Jumlah Pemenang</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            min={0}
            type="number"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            placeholder="0"
            className={`${inputClass}`}
          />
        </div>
      </div>
      <div>
        <div className="flex w-full">
          <div className="w-1/2 px-1 py-0.5 border-x border-y border-[#000] font-bold">
            Pemenang ke
          </div>
          <div className="w-1/2 px-1 py-0.5 border-r border-y border-[#000] font-bold">
            Hadiah
          </div>
        </div>
        {prize_place.map((item, index) => {
          return (
            <div key={index} className="flex">
              <div className="w-1/2 px-1 py-0.5 border-x border-b border-[#000]">
                {item.prize_place}
              </div>
              <div className="flex justify-between w-1/2 px-1 py-0.5 border-r border-b border-[#000]">
                <p>{item.prize_name}</p>
                <button
                  onClick={() => HandleEdit(index)}
                  className="hover:text-[#0190fe]"
                >
                  <BiEdit />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {show && (
        <div className="fixed flex items-center justify-center h-screen w-full top-0 left-0 z-50">
          <div
            onClick={() => setShow(false)}
            className="absolute h-screen w-full bg-[#000000]/[0.2] z-[-1]"
          />
          <div className="animate-zoom-out relative flex bg-white w-[500px] h-max p-5 rounded z-[1]">
            <div className="flex flex-col gap-4 w-full">
              <h1 className="text-xl font-bold">Pilih Hadiah</h1>
              <select
                onChange={HandleChange}
                className={`bg-white ${inputClass}`}
              >
                <option value="">Pilih Hadiah</option>
                {prize.map((item, index) => {
                  return (
                    <option key={index} value={item.image}>
                      {item.prize_name}
                    </option>
                  );
                })}
              </select>
              <div className="flex justify-end gap-2 text-white">
                <button
                  onClick={HandleSelect}
                  className="px-3 py-1 bg-[#0190fe] hover:bg-[#0190fe]/[0.9] rounded"
                >
                  Simpan
                </button>
                <button
                  onClick={() => setShow(false)}
                  className="px-3 py-1 bg-[#fb434a] hover:bg-[#fb434a]/[0.9] rounded"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WinnerPrize;

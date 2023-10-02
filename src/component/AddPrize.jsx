import { useEffect, useState } from "react";

// Assests //
import { TiPlus, TiTrash } from "react-icons/ti";
import { FiUploadCloud } from "react-icons/fi";

// Component //
import { Context } from "../context/StateContext";
import { ButtonNotValid, ButtonSave, inputClass } from "./ClassName";
import { toast } from "react-hot-toast";

const AddPrize = () => {
  const [show, setShow] = useState(false);
  const [show_delete, setShow_delete] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [prize_name, setPrize_name] = useState("");
  const [upload, setUpload] = useState("");

  const { prize, setPrize } = Context();

  const onEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (upload !== "") {
        handleSave();
      } else {
        toast.error("Mohon Tambahkan Image");
      }
    }
  };

  const loadImage = async (event) => {
    const image = event.target.files[0];

    if (image) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setUpload(e.target.result);
      };

      reader.readAsDataURL(image);
    }
  };

  const GetID = (index) => {
    setItemIndex(index)
    setShow_delete(true)
  };

  const handleSave = () => {
    setPrize([...prize, { prize_name: prize_name, image: upload }]);
    setShow(false);
    setPrize_name("");
    setUpload("");
  };

  const handleDelete = () => {
    const hapusPost = [...prize];
    hapusPost.splice(itemIndex, 1);
    setPrize(hapusPost);
    setShow_delete(false)
  };
  const handleClose = () => {
    setShow(false);
  };

  const isFormValid = prize_name && upload !== "";

  return (
    <div className="flex flex-col gap-3">
      <div>
        <div className="flex justify-between items-center mb-5">
          <p className="font-bold text-xl">Jenis Hadiah</p>
          <button
            onClick={() => setShow(true)}
            className="flex items-center py-1 px-3 w-max border overflow-hidden rounded"
          >
            <TiPlus />
            Tambah Hadiah
          </button>
        </div>
        <div className="flex">
          <p className="w-[50%] px-3 py-0.5 border border-[#000]">Gambar</p>
          <p className="w-[40%] px-3 py-0.5 border-y border-r border-[#000]">
            Keterangan
          </p>
          <p className="w-[10%] px-3 py-0.5 border-y border-r border-[#000]">
            Hapus
          </p>
        </div>
        <div className="min-h-[200px]">
          {prize.map((data, index) => (
            <div key={index} className="flex">
              <div className="w-[50%] p-3 border-b border-x border-[#000]">
                <img
                  src={data.image}
                  alt={`Preview ${index + 1}`}
                  className="w-[70%]"
                />
              </div>
              <div className="w-[40%] p-3 border-b border-r border-[#000]">
                {data.prize_name}
              </div>
              <div className="w-[10%] text-[#fb434a] text-2xl p-3 border-b border-r border-[#000]">
                <button value={index} onClick={() => GetID(index)}>
                  <TiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="my-5">{prize?.length} Total</div>
      </div>
      {show && (
        <div className="fixed flex justify-center h-screen w-full top-0 left-0">
          <div
            onClick={handleClose}
            className="absolute h-screen w-full bg-[#000000]/[0.2] z-[-1]"
          />
          <div className="animate-zoom-out relative flex flex-col gap-5 mt-10 p-5 bg-white w-[600px] min-h-[400px] h-max rounded z-[1] ">
            <div>
              <p className="font-bold">Nama Hadiah</p>
              <input
                type="text"
                value={prize_name}
                onKeyDown={onEnter}
                className={`mt-2 ${inputClass}`}
                onChange={(e) => setPrize_name(e.target.value)}
              />
            </div>
            <div className="relative flex justify-center items-center border w-max overflow-hidden rounded">
              <div className="flex items-center gap-1 py-1 px-3">
                <span className="text-xl">
                  <FiUploadCloud />
                </span>
                Tambah Image
              </div>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={loadImage}
                className="absolute opacity-0 w-[170%] h-ful cursor-pointer right-0"
              />
            </div>
            <div className="mt- h-[350px] overflow-y-auto">
              {upload !== "" ? (
                <img src={upload} alt="" className="w-[50%] h-max" />
              ) : (
                <></>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className={isFormValid ? ButtonSave : ButtonNotValid}
                disabled={!isFormValid}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
      {show_delete && (
        <div className="fixed flex items-center justify-center h-screen w-full top-0 left-0 z-[100]">
          <div
            onClick={() => setShow_delete(false)}
            className="absolute h-screen w-full bg-[#000000]/[0.2] z-[-1]"
          />
          <div className="animate-zoom-out relative flex justify-center bg-white w-max h-[160px] px-10 rounded z-[1]">
            <div className="mt-14">
              <p>Apakah anda ingin menghapus image?</p>
            </div>
            <div className="absolute flex items-center gap-2 right-10 bottom-4 text-white">
              <button
                onClick={handleDelete}
                className="w-16 py-0.5 bg-[#0190fe] hover:bg-[#0190fe]/[0.9] border rounded"
              >
                ya
              </button>
              <button
                onClick={() => setShow_delete(false)}
                className="w-16 py-0.5 bg-[#fb434a] hover:bg-[#fb434a]/[0.9] border rounded"
              >
                tidak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPrize;

import { useState } from "react";
import { Context } from "../context/StateContext";
import { toast } from "react-hot-toast";
import Pagination from "./Pagination";
import * as XLSX from "xlsx";

const PrizePlacement = () => {
  const { winner, setWinner } = Context();
  const [delete_modal, setDelete_modal] = useState(false);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  const lastPostIndex = page * item;
  const firstPostIndex = lastPostIndex - item;
  const currentPost = winner?.slice(firstPostIndex, lastPostIndex);

  const exportToExcel = () => {
    if (winner.length === 0) {
      toast.error("Belum ada data pemenang untuk diekspor ke Excel");
      return;
    }

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(winner);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pemenang");

    XLSX.writeFile(workbook, "data_pemenang.xlsx");

    toast.success("Data pemenang berhasil diekspor ke Excel");
  };

  const HandleDelete = () => {
    if (winner.length == 0) {
      toast.error("Belum ada data pemenang");
    } else {
      setDelete_modal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-max">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold">Data Pemenang</h1>
        <div className="flex items-center">
          <button
            onClick={HandleDelete}
            className="flex justify-center items-center px-2 shadow_inner relative w-max overflow-hidden rounded-l"
          >
            Hapus
          </button>
          <button
            onClick={exportToExcel}
            className="flex justify-center items-center px-2 shadow_inner relative w-max overflow-hidden rounded-l"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="flex">
        <div className="w-[4%] px-1 py-0.5 border-x border-y border-[#000] font-bold">
          No
        </div>
        <div className="w-[12%] px-1 py-0.5 border-r border-y border-[#000] font-bold">
          Order Code
        </div>
        <div className="w-[28%] px-1 py-0.5 border-r border-y border-[#000] font-bold">
          Nama Customer
        </div>
        <div className="w-[21%] px-1 py-0.5 border-r border-y border-[#000] font-bold">
          Provinsi
        </div>
        <div className="w-[20%] px-1 py-0.5 border-r border-y border-[#000] font-bold">
          Urutan Pemenang
        </div>
        <div className="w-[15%] px-1 py-0.5 border-r border-y border-[#000] font-bold">
          Hadiah
        </div>
      </div>
      {currentPost.map((item, index) => {
        return (
          <div key={index} className="flex">
            <div className="w-[4%] px-1 py-0.5 border-x border-b border-[#000]">
              {index + 1}.
            </div>
            <div className="w-[12%] px-1 py-0.5 border-r border-b border-[#000]">
              {item.order_id}
            </div>
            <div className="w-[28%] px-1 py-0.5 border-r border-b border-[#000]">
              {item.nama_customer}
            </div>
            <div className="w-[21%] px-1 py-0.5 border-r border-b border-[#000]">
              {item.provinsi}
            </div>
            <div className="w-[20%] px-1 py-0.5 border-r border-b border-[#000]">
              pemenang ke - {index + 1}
            </div>
            <div className="w-[15%] px-1 py-0.5 border-r border-b border-[#000]">
              {item.prize}
            </div>
          </div>
        );
      })}
      {delete_modal && (
        <div className="fixed flex items-center justify-center h-screen w-full top-0 left-0 z-[100]">
          <div
            onClick={() => setDelete_modal(false)}
            className="absolute h-screen w-full bg-[#000000]/[0.2] z-[-1]"
          />
          <div className="animate-zoom-out relative flex justify-center bg-white w-max h-[160px] px-10 rounded z-[1]">
            <div className="mt-14">
              <p>Apakah anda ingin menghapus data pemenang?</p>
            </div>
            <div className="absolute flex items-center gap-2 right-10 bottom-4 text-white">
              <button
                onClick={() => {
                  setWinner([]);
                  setDelete_modal(false);
                }}
                className="w-16 py-0.5 bg-[#0190fe] hover:bg-[#0190fe]/[0.9] border rounded"
              >
                ya
              </button>
              <button
                onClick={() => setDelete_modal(false)}
                className="w-16 py-0.5 bg-[#fb434a] hover:bg-[#fb434a]/[0.9] border rounded"
              >
                tidak
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end mt-5">
        {winner.length > 10 && (
          <Pagination
            total={winner?.length}
            item={item}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </div>
  );
};

export default PrizePlacement;

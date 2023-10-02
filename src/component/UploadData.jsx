import React, { useEffect, useState } from "react";
import { TiPlus, TiTrash } from "react-icons/ti";
import Papa from "papaparse";
import { Context } from "../context/StateContext";
import Pagination from "./Pagination";

function UploadData() {
  const { csvData, setCsvData } = Context();
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(10);

  const lastPostIndex = page * item;
  const firstPostIndex = lastPostIndex - item;
  const currentPost = csvData?.slice(firstPostIndex, lastPostIndex);

  const handleItem = (e) => {
    const value = e.target.value;
    setItem(value);
  };

  const handleCsvUpload = (event) => {
    const files = event.target.files;
    const newCsvData = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          newCsvData.push(...results.data);
          if (i === files.length - 1) {
            setCsvData(newCsvData);
          }
        },
      });
    }
  };

  const Hapus = () => {
    if (csvData?.length > 0) {
      setCsvData(null);

      const fileInput = document.getElementById("fileInput");
      if (fileInput) {
        fileInput.value = null;
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Data Peserta</h1>
        <div className="flex items-center">
          <div className="flex justify-center items-center shadow_inner relative w-max overflow-hidden rounded-l">
            <div className="flex items-center gap-1 py-1 px-3">
              <TiPlus />
              Upload
            </div>
            <input
              type="file"
              accept=".csv"
              multiple
              onChange={handleCsvUpload}
              className="absolute opacity-0 w-[170%] h-full cursor-pointer right-0"
            />
          </div>
          <div
            onClick={Hapus}
            className="flex justify-center items-center shadow_inner py-1 px-3 w-max overflow-hidden rounded-r"
          >
            <TiTrash />
            Hapus
          </div>
        </div>
      </div>
      <div className="min-h-[400px]">
        {csvData && (
          <div className="">
            <div className="flex gap-1 mb-3">
              <h2>Tampilkan </h2>
              <select
                onChange={(e) => handleItem(e)}
                className="duration-200 px-1 w-14 bg-[#ffffff] border border-[#c1c4cd] rounded outline-none focus:border-[#0190fe]"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <h2>Data</h2>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index} className="border">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPost.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value, index) => (
                      <td key={index} className="border px-5">
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5">
              <Pagination
                total={csvData?.length}
                item={item}
                page={page}
                setPage={setPage}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadData;

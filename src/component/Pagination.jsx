import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

const Pagination = ({ total, item, page, setPage, onPageChange }) => {
    const totalPages = Math.ceil(total / item);

    const getPageNumbers = () => {
        const pageNumbers = [];
        const totalVisiblePages = 5;
      
        let startPage = Math.max(1, page - Math.floor(totalVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + totalVisiblePages - 1);
      
        if (endPage - startPage < totalVisiblePages - 1) {
          startPage = Math.max(1, endPage - totalVisiblePages + 1);
        }
      
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
      
        return pageNumbers;
      };
      
      

  const nextPage = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber)
  };

  return (
    <div className="flex items-center gap-0.5 sm:gap-3 mr-5">
      <button
        onClick={() => setPage(1)}
        className={`text-xl ${
          page == 1 && "cursor-not-allowed text-[#c1c4cd]"
        }`}
      >
        <MdSkipPrevious />
      </button>
      <button
        onClick={prevPage}
        className={`text-xl ${
          page == 1 && "cursor-not-allowed text-[#c1c4cd]"
        }`}
      >
        <IoMdArrowDropleft />
      </button>
      <div className="flex justify-center items-center">
        <div className="flex w-full sm:gap-2">
          {getPageNumbers().map((pageNumber, index) => {
            return (
              <button
                key={index}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-1.5  sm:px-2 sm:py-0.5 rounded
            ${page === pageNumber && "text-white bg-[#0190fe]"}
            `}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
      </div>
      <button
        onClick={nextPage}
        className={`text-xl ${
          page == totalPages && "cursor-not-allowed text-[#c1c4cd]"
        }`}
      >
        <IoMdArrowDropright />
      </button>
      <button
        onClick={() => setPage(totalPages)}
        className={`text-xl ${
          page == totalPages && "cursor-not-allowed text-[#c1c4cd]"
        }`}
      >
        <MdSkipNext />
      </button>
    </div>
  );
};

export default Pagination;

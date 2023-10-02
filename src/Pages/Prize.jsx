import AddPrize from "../component/AddPrize";
import WinnerPrize from "../component/WinnerPrize";

function Prize() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center m-5">
      <div className="w-[70vw] bg-white p-5 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <WinnerPrize />
      </div>
      <div className="w-[70vw] bg-white p-5 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <AddPrize />
      </div>
    </div>
  );
}

export default Prize;

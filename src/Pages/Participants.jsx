import UploadData from "../component/UploadData";
import PrizePlacement from "../component/PrizePlacement";

function Participants() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center m-5">
      <div className="w-[70vw] bg-white p-5 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <PrizePlacement />
      </div>
      <div className="w-[70vw] bg-white p-5 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <UploadData />
      </div>
    </div>
  );
}

export default Participants;

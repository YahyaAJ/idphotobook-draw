import Image from "../component/Image";

function Settings() {
  return (
    <div className="flex justify-center m-5">
      <div className="flex flex-col gap-5 w-[70vw] bg-white p-5 shadow-[0_1px_4px_0_rgba(0,0,0,0.25)]">
        <h1 className="text-xl font-bold">Background</h1>
        <Image />
      </div>
    </div>
  );
}

export default Settings;

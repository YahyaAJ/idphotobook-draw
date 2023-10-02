import { Context } from "../context/StateContext";
import { FiUploadCloud } from "react-icons/fi";
import { useEffect } from "react";

function ImageUpload() {
  const { image, setImage } = Context();

  const UploadImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage("");
    }
  };

  useEffect(() => {
    if (image === "") {
      setImage(
        "https://github.com/YahyaAJ/photo-storage/blob/main/Untitled%20design.png?raw=true"
      );
    }
  }, []);

  return (
    <div>
      <div className="relative flex justify-center items-center border w-max overflow-hidden rounded outline-none hover:bg-[#c1c4cd]/[0.15] shadow-[0_1px_3px_0_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-1 py-1 px-3">
          <span className="text-xl">
            <FiUploadCloud />
          </span>
          Background
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={UploadImage}
          className="absolute opacity-0 w-[170%] h-full cursor-pointer right-0"
        />
      </div>
      <div className="min-h-[400px]">
        {image && <img src={image} alt="Pratinjau Gambar" className="mt-2" />}
      </div>
    </div>
  );
}

export default ImageUpload;

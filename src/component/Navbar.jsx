import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div
      className={`w-full bg-[#006D5B] text-white ${
        pathname === "/draw" && "hidden bg-[crimson]"
      }`}
    >
      <ul className="flex gap-5 text-lg pl-[15%] py-3">
        <Link to="/">Settings</Link>
        <Link to="/peserta">Peserta</Link>
        <Link to="/hadiah">Hadiah</Link>
        <Link to="/draw" className="font-bold">
          Mulai Undian
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;

import { Route, Routes } from "react-router-dom";
import "./App.css";

// component //
import Navbar from "./component/Navbar";

// pages //
import Participants from "./Pages/Participants";
import Settings from "./Pages/Settings";
import Prize from "./Pages/Prize";
import Draw from "./Pages/Draw";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster containerStyle={{ zIndex: "999999999999999" }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Settings />} />
        <Route path="/peserta" element={<Participants />} />
        <Route path="/hadiah" element={<Prize />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </>
  );
}

export default App;

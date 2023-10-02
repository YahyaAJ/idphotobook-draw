import { createContext, useContext, useState } from "react";

const UseContext = createContext();

export const StateContext = ({ children }) => {
  const [participants, setParticipants] = useState(3);
  const [image, setImage] = useState("");
  const [data, setData] = useState();
  const [winner, setWinner] = useState([]);
  const [prize, setPrize] = useState([]);
  const [csvData, setCsvData] = useState(null);
  const [prize_place, setPrize_place] = useState([]);
  const [change, setChange] = useState("");
  const [prize_image, setPrize_image] = useState("");

  const [inputColor, setInputColor] = useState("");
  return (
    <UseContext.Provider
      value={{
        data,
        setData,
        participants,
        setParticipants,
        image,
        setImage,
        inputColor,
        setInputColor,
        winner,
        setWinner,
        csvData,
        setCsvData,
        prize,
        setPrize,
        prize_place,
        setPrize_place,
        change,
        setChange,
        prize_image,
        setPrize_image,
      }}
    >
      {children}
    </UseContext.Provider>
  );
};

export const Context = () => useContext(UseContext);

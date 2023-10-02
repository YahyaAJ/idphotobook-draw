import RandomPicker from "../component/RandomPicker";
import { Context } from "../context/StateContext";

function Draw() {
  const { image } = Context();

  const containerStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
  };

  return (
    <div className="w-full h-screen" style={containerStyle}>
      <div className="flex justify-center h-full">
        <RandomPicker />
      </div>
    </div>
  );
}

export default Draw;

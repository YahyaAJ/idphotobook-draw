import React from "react";

const Input = ({ wrapClass, label, type, state, setState, placeholder }) => {
  return (
    <div className={wrapClass}>
      <label>{label}</label>
      <div>
        <input
          type={type}
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder={placeholder}
          className="duration-200 w-full h-10 mt-2 py-1.5 px-3 border border-[#c1c4cd] rounded outline-none focus:border-[#0190fe]"
        />
      </div>
    </div>
  );
};

export default Input;

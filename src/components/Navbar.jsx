import React from "react";
import Dropdown from "react-select";

const Navbar = () => {
  const assets = [
    { value: "charts", label: "Charts" },
    { value: "table", label: "Table" },
    { value: "map", label: "Map" },
  ];

  const duration = [
    { value: "1m", label: "1m" },
    { value: "3m", label: "3m" },
    { value: "5m", label: "5m" },
    { value: "15m", label: "15m" },
  ];

  return (
    <div className="h-20 w-full bg-gray-900 border-gray-900 border-b-4">
      <div className="flex flex-row justify-between px-32 pt-5">
        <div className="text-white text-xl pt-1">Binance Candlestick Chart</div>
        <div className="flex flex-row space-x-10">
          <Dropdown options={assets} />
          <Dropdown options={duration} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import StorageService from "../../../services/StorageService";
import sunIcon from "../../../assets/img/icons/sun.svg";
import moonIcon from "../../../assets/img/icons/moon.svg";
import "./index.css";

export default function ModeSwitcher() {
  const [mode, setMode] = useState(StorageService.mode);

  useEffect(() => {
    StorageService.mode = mode;
  }, [mode]);

  const handleClick = () => {
    setMode(mode === "dark" ? "light" : "dark");
  };

  return (
    <div onClick={handleClick} className={clsx("mode-switcher", mode === "light" && "light")}>
      <img src={sunIcon} alt="" />
      <img src={moonIcon} alt="" />
      <div className={clsx("circle", mode === "dark" ? "left" : "right")}></div>
      {/* {mode === "dark" ? (
        <i className="fa fa-sun-o fa-sm"></i>
      ) : (
        <i className="fa fa-moon-o fa-sm"></i>
      )} */}
    </div>
  );
}

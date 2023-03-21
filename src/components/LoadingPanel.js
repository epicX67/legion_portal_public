import React, { useEffect, useState } from "react";
import loadingIcon from "../res/loading.svg";
import "./LoadingPanel.scss";

export default function LoadingPanel({
  showGame,
  setAutoFullScreen,
  autoFullScreen,
  toggleFullscreen,
}) {
  const [hide, setHide] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setHide(true);
      if (autoFullScreen) {
        setAutoFullScreen(false);
        toggleFullscreen(true);
      }
      setTimeout(() => {
        setDisable(true);
        showGame(true);
      }, 700);
    }, 5000);
  });

  return (
    !disable && (
      <div className={`loading-panel ${hide && "hide"}`}>
        <img
          className="loadingImage"
          src="https://cdn.discordapp.com/attachments/961665882671677493/1086699640948260954/loading.svg"
          alt="Loading"
        ></img>
      </div>
    )
  );
}

import React, { useEffect, useState } from "react";
import loadingIcon from "../res/loading.svg";
import "./LoadingPanel.scss";

export default function LoadingPanel({ showGame }) {
  const [hide, setHide] = useState(false);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      setHide(true);
      setTimeout(() => {
        setDisable(true);
        showGame(true);
      }, 700);
    }, 5000);
  });

  return (
    !disable && (
      <div className={`loading-panel ${hide && "hide"}`}>
        <img className="loadingImage" src={loadingIcon} alt="Loading"></img>
      </div>
    )
  );
}

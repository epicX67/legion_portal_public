import React from "react";
import "./AdsCard.scss";

export default function AdsCard({ onAdClick, item }) {
  return (
    <div className="ads-card">
      <div
        className="cover"
        style={{ backgroundImage: "url(" + item.wideImage + ")" }}
      ></div>
      <div className="bCont">
        <div className="title" onClick={() => onAdClick()}>
          {item.name}
        </div>
        <div className="info">Advertisement</div>
      </div>
    </div>
  );
}

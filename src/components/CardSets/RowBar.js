import React from "react";
import "./RowBar.scss";

export default function RowBar({ action = () => {} }) {
  return (
    <div className="rowBar">
      <div className="fCont">
        <i className="ri-exchange-funds-line"></i>
        <div className="title">Try Random Game</div>
        <div className="badges">BETA</div>
      </div>
      <div className="pillBtn" onClick={() => action()}>
        Try Now
      </div>
    </div>
  );
}

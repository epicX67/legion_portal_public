import React, { useState } from "react";
import HeroVideo from "./HeroVideo";

export default function HeroCard({ key, item, onPlay }) {
  const [show, setShow] = useState(false);
  return (
    <div
      key={key}
      className="heroCard"
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => setShow(false)}
    >
      <div className="heroCard-background-handler">
        <div className="overlayCont"></div>
        <div
          style={{ backgroundImage: `url('${item.featuredImg}')` }}
          className="imageCont"
        ></div>
        <HeroVideo
          show={show}
          url="https://v.poki.com/2043a94c-1d69-4aff-a740-4e1510b1b4d0/thumbnail.3x3.vp9.mp4"
        />
      </div>

      <div className="game-head">
        <img src={item.gameLogo} alt=""></img>
      </div>

      <div className="game-info">
        {/* <div className="name">{item.name}</div> */}
        <div className="info">{item.featuredDesc}</div>
        <div onClick={onPlay} className="play-btn">
          <i className="ri-play-fill"></i>
          <div>Play</div>
        </div>
      </div>
    </div>
  );
}

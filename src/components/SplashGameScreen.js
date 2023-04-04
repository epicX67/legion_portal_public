import React, { useEffect, useState } from "react";
import "./SplashGameScreen.scss";

export default function SplashGameScreen({
  game,
  disable,
  setDisableSplash,
  toggleFullscreen,
  showGame,
}) {
  // const [hide, setHide] = useState(false);
  // const [disable, setDisable] = useState(false);
  // const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);

  const startGame = (fullscreen) => {
    setTimeout(() => {
      window.scrollTo(0, 0);
      if (fullscreen) {
        toggleFullscreen(true);
      }
      setTimeout(() => {
        setDisableSplash(true);
        showGame(true);
      }, 700);
    }, 5000);
  };

  useEffect(() => {
    setAnimating(false);
  }, [game]);

  return (
    <div className={`splash-game-screen ${disable && "hide"}`}>
      {/* <div
        className="loadingIframe"
        dangerouslySetInnerHTML={{ __html: url }}
      ></div> */}
      <div className="loadingCont">
        <div
          style={{ backgroundImage: `url('${game.wideImage}')` }}
          className="bg"
        ></div>
        <div
          style={{ backgroundImage: `url('${game.squareImage}')` }}
          className={`logo ${animating && "startAnima"}`}
        ></div>
        <button
          className={`mobile-play-button play-btn ${animating && "hide"}`}
          onClick={() => {
            // initiateLoading(true);
            setAnimating(true);
            startGame(true);
          }}
        >
          Play Now
        </button>
        <button
          className={`desktop-play-button play-btn ${animating && "hide"}`}
          onClick={() => {
            // initiateLoading(true);
            setAnimating(true);
            startGame(false);
          }}
        >
          Play Now
        </button>
        <p>
          Powered by
          <span>
            <img
              src="https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
              alt=""
            />
            LEGiON
          </span>
        </p>
      </div>
    </div>
  );
}

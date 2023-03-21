import React from "react";
import "./SplashGameScreen.scss";

export default function SplashGameScreen({
  game,
  initiateLoading,
  setAutoFullScreen,
  hide,
  disable,
}) {
  // const [hide, setHide] = useState(false);
  // const [disable, setDisable] = useState(false);
  // const navigate = useNavigate();

  return disable ? null : (
    <div className={`splash-game-screen ${hide && "hide"}`}>
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
          className="logo"
        ></div>
        <button
          className="mobile-play-button"
          onClick={() => {
            setAutoFullScreen(true);
            initiateLoading(true);
          }}
        >
          Play Now
        </button>
        <button
          className="desktop-play-button"
          onClick={() => {
            initiateLoading(true);
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

/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import "./ShortPlay.scss";

import { useRouter } from "next/navigation";
import SplashGameScreen from "@/components/SplashGameScreen";
import ShareModal from "@/dynamic_pages/ShareModal";
import { shuffle } from "@/res/data";

export default function ShortPlay({ games }) {
  const data = useMemo(() => shuffle(games), []);
  const [fullscreen, setFullscreen] = useState(false);
  const [gameInfo, setGameInfo] = useState(() => data[0]);
  const router = useRouter();

  //loading states
  const [initiateLoading, setInitiateLoading] = useState(false);
  const [disableSplash, setDisableSplash] = useState(false);
  const [autoFullScreen, setAutoFullScreen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [yourFavourite, setYourFavourite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const resetPlayState = () => {
    setInitiateLoading(false);
    setDisableSplash(false);
    setShowGame(false);
    // window.scrollTo(0, 0);
  };

  const makeFavourite = (name, action) => {
    if (!action && !localStorage.getItem("favourites")) {
      setYourFavourite(false);
    }

    const favourites = JSON.parse(localStorage.getItem("favourites"));

    if (!action) {
      const newFavourites = favourites.filter(
        (item) => item.toLowerCase() !== name.toLowerCase()
      );
      localStorage.setItem("favourites", JSON.stringify(newFavourites));
      setYourFavourite(false);
      return;
    }

    setYourFavourite(true);
    if (!favourites) {
      localStorage.setItem("favourites", JSON.stringify([name]));
      return;
    }

    favourites.push(name);
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  useEffect(() => {
    // setGameInfo(game);
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (!favourites) {
      setYourFavourite(false);
    } else {
      const isThisYourFavourite = favourites.find(
        (item) => item === gameInfo.name
      );
      setYourFavourite(isThisYourFavourite ? true : false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games]);

  useEffect(() => {
    if (initiateLoading) {
      setDisableSplash(true);
      setInitiateLoading(false);
    }
  }, [initiateLoading]);

  const toggleFullscreen = (toggle) => {
    if (toggle) setFullscreen(!fullscreen);
    if (!fullscreen && toggle) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  return (
    <>
      <div className="play">
        <div className={`play-cont ${fullscreen && "fullscreen"}`}>
          <div className="game-cont">
            <div className="game-wrapper">
              <SplashGameScreen
                game={gameInfo}
                disable={disableSplash}
                setDisableSplash={setDisableSplash}
                autoFullScreen={autoFullScreen}
                setAutoFullScreen={setAutoFullScreen}
                toggleFullscreen={toggleFullscreen}
                showGame={setShowGame}
              />

              {disableSplash && (
                <>
                  {fullscreen && (
                    <div
                      className="mobile-back-btn"
                      onClick={() => toggleFullscreen(true)}
                    >
                      <i className="ri-arrow-left-s-line"></i>
                      <img src="https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"></img>
                    </div>
                  )}
                  <iframe
                    title={gameInfo.name}
                    src={gameInfo.link}
                    className="game fullscreen"
                    allowFullScreen={true}
                  ></iframe>
                </>
              )}

              <div className="play-down-bar">
                <div className="expander">
                  <div className="pill"></div>
                </div>
                <div className="lCont">
                  <div
                    className="play-logo"
                    style={{
                      backgroundImage: `url('${gameInfo.squareImage}')`,
                    }}
                  ></div>
                  <div className="play-info">{gameInfo.name}</div>
                </div>

                <p className="legionStamp">
                  <span>
                    <img
                      src="https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
                      alt=""
                    />
                    LEGiON
                  </span>
                  Portal
                </p>

                <div className="play-actions">
                  <i
                    onClick={() => {
                      toggleFullscreen(false);
                      router.back();
                    }}
                    className="ri-arrow-left-s-line tooltip back-btn"
                    // title="Go Back"
                  ></i>
                  {!fullscreen && (
                    <i
                      onClick={() => {
                        setShowShareModal(true);
                      }}
                      className="ri-share-line tooltip share-btn"
                      // title="Share"
                    ></i>
                  )}
                  {yourFavourite ? (
                    <i
                      onClick={() => {
                        makeFavourite(gameInfo.name, false);
                      }}
                      style={{ color: "#E886B5" }}
                      className="ri-heart-2-fill tooltip rfevorite-btn"
                      // title="Remove from favorites"
                    ></i>
                  ) : (
                    <i
                      onClick={() => {
                        makeFavourite(gameInfo.name, true);
                      }}
                      className="ri-heart-2-line tooltip afevorite-btn"
                      // title="Add to favorites"
                    ></i>
                  )}

                  {/* <i
                  onClick={() => goto(gameInfo.url)}
                  className="bx bxs-window-alt"
                ></i> */}

                  <i
                    onClick={() => toggleFullscreen(true)}
                    className={`ri-fullscreen-line tooltip fullscreen-btn ${
                      !showGame && "disabled"
                    }`}
                    // title="Fullscreen"
                  ></i>
                  <i
                    onClick={() => toggleFullscreen(true)}
                    className="bx ri-fullscreen-exit-line"
                    title="Exit Fullscreen"
                  ></i>
                </div>
              </div>
            </div>
            <div className="action">Action Panel</div>
          </div>
        </div>
      </div>
      <ShareModal
        show={showShareModal}
        toggle={setShowShareModal}
        url={"https://legion-portal.vercel.app" + gameInfo.name}
      />
    </>
  );
}

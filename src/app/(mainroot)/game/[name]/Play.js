/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import "./Play.scss";

import { useRouter, usePathname } from "next/navigation";
import { categories, filterByValue, shuffle } from "@/res/data";
import SplashGameScreen from "@/components/SplashGameScreen";
import LoadingPanel from "@/components/LoadingPanel";
import dynamic from "next/dynamic";
import ShareModal from "@/dynamic_pages/ShareModal";
import ReactStars from "react-rating-stars-component";
import AdsCard from "@/components/Card/AdsCard";

const CardSetTypeA = dynamic(
  () => import("@/components/CardSets/CardSetTypeA"),
  { ssr: false }
);
const CardSetTypeSuperWide = dynamic(
  () => import("@/components/CardSets/CardSetTypeSuperWide"),
  { ssr: false }
);
const CardSetTypeCircle = dynamic(
  () => import("@/components/CardSets/CardSetTypeCircle"),
  { ssr: false }
);
const CardSetTypeSquare = dynamic(
  () => import("@/components/CardSets/CardSetTypeSquare"),
  { ssr: false }
);

export default function Play({ games, game }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [gameInfo, setGameInfo] = useState({});
  // const [loadingGame, setLoadingGame] = useState({});
  const [err, setErr] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  //loading states
  const [initiateLoading, setInitiateLoading] = useState(false);
  const [disableSplash, setDisableSplash] = useState(false);
  const [autoFullScreen, setAutoFullScreen] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [yourFavourite, setYourFavourite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const legionAds = useMemo(
    () => shuffle(filterByValue("row", "Row 1", games), 3),
    []
  );

  const resetPlayState = () => {
    setInitiateLoading(false);
    setDisableSplash(false);
    setShowGame(false);
    // window.scrollTo(0, 0);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  //Recommended card states
  const content1 = useMemo(
    () =>
      shuffle(
        games.filter((item) =>
          !item.section ? false : item.section.includes("Most played")
        )
      ),
    [games, gameInfo]
  );
  const content2 = useMemo(
    () => shuffle(filterByValue("row", "Row 3", games)),
    [games, gameInfo]
  );
  const content3 = useMemo(
    () => shuffle(games.filter((item) => item.category.includes("Action"))),
    [games, gameInfo]
  );
  const content4 = useMemo(
    () =>
      shuffle(
        games.filter((item) =>
          !item.section ? false : item.section.includes("Trending")
        )
      ),
    [games, gameInfo]
  );

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
    setGameInfo(game);
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (!favourites) {
      setYourFavourite(false);
    } else {
      const isThisYourFavourite = favourites.find((item) => item === game.name);
      setYourFavourite(isThisYourFavourite ? true : false);
    }

    window.scrollTo(0, 0);

    if (game?.description) {
      document.getElementById("playdesc").innerHTML = game.description;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [games, game]);

  useEffect(() => {
    if (initiateLoading) {
      setDisableSplash(true);
      setInitiateLoading(false);
    }
  }, [initiateLoading]);

  // Recent games collector
  useEffect(() => {
    if (!gameInfo.name) return;

    let recentGames = JSON.parse(localStorage.getItem("recents"));
    if (!recentGames) localStorage.setItem("recents", JSON.stringify([]));

    recentGames = JSON.parse(localStorage.getItem("recents"));

    // Check if current game exists inside the list
    const currGameIndex = recentGames.indexOf(gameInfo.name);

    // Removing current game from old position
    if (currGameIndex !== -1) {
      recentGames = recentGames.filter((item) => item !== gameInfo.name);
    }

    // Removing old games if list is bigger than 10
    if (recentGames.length >= 10)
      recentGames = recentGames.slice(
        recentGames.length - 10,
        recentGames.length
      );

    recentGames.push(gameInfo.name);
    localStorage.setItem("recents", JSON.stringify(recentGames));
  }, [gameInfo]);

  // Looking for parameter change
  useEffect(() => {
    resetPlayState();
  }, [game]);

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

              <div
                // style={{ display: "none" }}
                className="play-down-bar"
              >
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

                {/* {disableSplash && ( */}
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
                {/* )} */}

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

            <CardSetTypeA
              call={() => resetPlayState()}
              title="Recommended For You"
              data={content1}
            />
            <CardSetTypeSquare
              call={() => resetPlayState()}
              title="Legacy Games"
              data={content2}
            />
            <CardSetTypeCircle
              call={() => resetPlayState()}
              title="Action Games"
              data={content3}
            />
            <CardSetTypeSuperWide
              call={() => resetPlayState()}
              title="Big Shot Games"
              data={content4}
            />
            <div className="gameDescMain">
              <div
                style={{
                  display: `${gameInfo.description ? "block" : "none"}`,
                }}
                className="gameDesc"
              >
                <div className="gameInfo">
                  <div className="subTitle">{`Games > Action Game`}</div>
                  <div className="title">{gameInfo.name}</div>
                  <div className="actions">
                    <div
                      className="pill-action"
                      onClick={() => {
                        setShowShareModal(true);
                      }}
                    >
                      Share
                    </div>
                    <div
                      className="pill-action"
                      onClick={() => {
                        router.push(`/embed/${gameInfo.name.toLowerCase()}`);
                      }}
                    >
                      Embed
                    </div>
                  </div>
                  <div className="infoSet">
                    <div className="row">
                      <div className="key">Rating</div>
                      <div className="value">
                        <ReactStars
                          value={4.5}
                          count={5}
                          onChange={ratingChanged}
                          size={18}
                          isHalf={true}
                          emptyIcon={<i className="ri-star-s-line"></i>}
                          halfIcon={<i className="ri-star-half-line"></i>}
                          fullIcon={<i className="ri-star-s-fill"></i>}
                          activeColor="#ffd700"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="key">Legion Score</div>
                      <div className="value">
                        <div className="bar">
                          <div
                            style={{ width: `${(75 / 100) * 100}%` }}
                            className="size"
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="key">Released</div>
                      <div className="value">2020</div>
                    </div>
                    <div className="row">
                      <div className="key">Developer</div>
                      <div className="value">LEGiON Platforms</div>
                    </div>
                    <div className="row">
                      <div className="key">Last Updated</div>
                      <div className="value">2022</div>
                    </div>
                    <div className="row">
                      <div className="key">Technology</div>
                      <div className="value">HTML5, ThreeJS</div>
                    </div>
                    <div className="row">
                      <div className="key">Platforms</div>
                      <div className="value">Browser, Mobile</div>
                    </div>
                    <div className="row">
                      <div className="key">Classification</div>
                      <div className="value">Game</div>
                    </div>
                  </div>
                </div>
                <div id="playdesc"></div>
                <div id="videoSection">
                  <h3>Videos</h3>
                  <iframe
                    width="320"
                    height="180"
                    src="https://www.youtube.com/embed/uvb00oaa3k8"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen={true}
                  ></iframe>
                </div>
                <div className="categories">
                  {categories.map((item, key) => (
                    <div
                      onClick={() => router.push(`/category/${item.title}`)}
                      key={key}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              </div>
              <div className="adsCont">
                <div className="titleBar">
                  <div className="title">LEGiON Ads</div>
                  <div className="action">About Ads</div>
                </div>
                <div className="ads">
                  {legionAds.map((item, key) => (
                    <AdsCard
                      key={key}
                      item={item}
                      onAdClick={() =>
                        router.push(`/game/${item.name.toLowerCase()}`)
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        show={showShareModal}
        toggle={setShowShareModal}
        url={"https://legion-portal.vercel.app" + pathName}
      />
    </>
  );
}

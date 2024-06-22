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
import EmbedModal from "@/dynamic_pages/EmbedModal";

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
  const [showEmbedModal, setShowEmbedModal] = useState(false);

  const legionAds = useMemo(
    () => shuffle(filterByValue("row", "Row 1", games), 3),
    []
  );
  const sampleGamesForSidebar = useMemo(() => shuffle(games, 40), []);

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
  const content1 = useMemo(() => shuffle(games, 15), [games, gameInfo]);
  const content2 = useMemo(
    () => shuffle(filterByValue("row", "Row 3", games)),
    [games, gameInfo]
  );
  const content3 = useMemo(
    () => shuffle(games.filter((item) => item.category.includes("Action"))),
    [games, gameInfo]
  );
  const content4 = useMemo(() => shuffle(games, 15), [games, gameInfo]);

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

  const exitHandler = () => {
    if (
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setFullscreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("webkitfullscreenchange", exitHandler, false);
    document.addEventListener("mozfullscreenchange", exitHandler, false);
    document.addEventListener("fullscreenchange", exitHandler, false);
    document.addEventListener("MSFullscreenChange", exitHandler, false);

    return () => {
      document.removeEventListener("webkitfullscreenchange", () => {});
      document.removeEventListener("mozfullscreenchange", () => {});
      document.removeEventListener("fullscreenchange", () => {});
      document.removeEventListener("MSFullscreenChange", () => {});
    };
  }, []);

  return (
    <>
      <div className="play">
        <div className={`play-cont ${fullscreen && "fullscreen"}`}>
          <div className="game-cont">
            <div className="gameplaySection">
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
                        <img src="/res/logo.png"></img>
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
                        src="/res/logo.png"
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
              <div className="gameplay-info">
                <div className="top-cont">
                  <div className="game-details">
                    <img src={gameInfo.squareImage} alt="game"></img>
                    <div>
                      <div className="subtitle">You Are Playing</div>
                      <div className="title">{gameInfo.name}</div>
                    </div>
                  </div>
                  <div className="sub-info">
                    Lorem ipsum dolor vendi vici greek fon don lorem ipsum
                  </div>
                  <div className="rating-info">
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

                    {`(4.5/5)`}
                  </div>
                  {/* <div className="row">
                    <div className="key">Legion Score</div>
                    <div className="value">
                      <div className="bar">
                        <div
                          style={{ width: `${(75 / 100) * 100}%` }}
                          className="size"
                        ></div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="bottom-cont">
                  <div className="grid-container">
                    <div className="grid-title">Games For You</div>
                    <div className="grid-scrollwrapper">
                      <div className="grid-main">
                        {sampleGamesForSidebar.slice(0, 18).map((item, key) => (
                          <div
                            key={key}
                            className="card"
                            onClick={() =>
                              router.push(`/game/${item.name.toLowerCase()}`)
                            }
                          >
                            <div
                              className="imageCont"
                              style={{
                                backgroundImage: `url('${item.squareImage}')`,
                              }}
                            ></div>
                            <div className="titleHolder">
                              <div className="title">{item.name}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid-main">
                        {sampleGamesForSidebar
                          .slice(19, 40)
                          .map((item, key) => (
                            <div
                              key={key}
                              className="card diffcard"
                              onClick={() =>
                                router.push(`/game/${item.name.toLowerCase()}`)
                              }
                            >
                              <div
                                className="imageCont"
                                style={{
                                  backgroundImage: `url('${item.squareImage}')`,
                                }}
                              ></div>
                              <div className="titleHolder">
                                <div className="title">{item.name}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <a id="contentStart" href="#contentStart">
                    <i className="ri-arrow-down-s-line"></i>View More
                  </a>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "1rem" }}></div>

            <CardSetTypeA
              call={() => resetPlayState()}
              title="Recommended For You"
              data={content1}
              see_more={false}
            />
            <CardSetTypeSquare
              call={() => resetPlayState()}
              title="Legacy Games"
              data={content2}
              see_more={false}
            />
            <CardSetTypeCircle
              call={() => resetPlayState()}
              title="Action Games"
              data={content3}
              see_more={false}
            />
            <CardSetTypeSuperWide
              call={() => resetPlayState()}
              title="Big Shot Games"
              data={content4}
              see_more={false}
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
                        setShowEmbedModal(true);
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
                {gameInfo?.tags && (
                  <div className="categories">
                    {gameInfo.tags.split(";").map((item, key) => (
                      <div
                        onClick={() => router.push(`/tag/${item}`)}
                        key={"tag" + key}
                      >
                        #{item}
                      </div>
                    ))}

                    {gameInfo.category.split(",").map((item, key) => (
                      <div
                        className="categoryItem"
                        onClick={() => router.push(`/category/${item.trim()}`)}
                        key={"cat" + key}
                      >
                        <img
                          className="categoryImage"
                          src="https://images.unsplash.com/photo-1536759808958-bcc29b661ec6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                        />
                        {item.trim()}
                      </div>
                    ))}
                  </div>
                )}
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
        url={"https://legionportal.netlify.app/" + pathName}
      />
      <EmbedModal
        show={showEmbedModal}
        toggle={setShowEmbedModal}
        url={`https://legionportal.netlify.app//embed/${gameInfo?.name?.toLowerCase()}`}
      />
    </>
  );
}

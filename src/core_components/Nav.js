"use client";
import React, { useEffect, useState } from "react";
import { useScrollDirection } from "react-use-scroll-direction";
import { useRouter, usePathname } from "next/navigation";
import "./Nav.scss";
import Search from "./Search";

export default function Nav({
  searchToggle,
  themeToggle,
  setStat,
  setLocalStat,
  statsToggle,
  games,
  randomGame,
  isEmbed,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const { isScrollingUp, isScrollingDown } = useScrollDirection();
  const [hide, setHide] = useState(false);
  const [glow, setGlow] = useState(false);

  const handleScroll = () => {
    if (pathName.includes("/game/") && window.pageYOffset < 20) {
      setHide(false);
      return;
    }

    if (isScrollingUp && window.pageYOffset < 20) {
      setHide(false);
    }

    if (isScrollingDown) {
      setHide(true);
    }
  };

  window.addEventListener("scroll", handleScroll);

  useEffect(() => {
    setGlow(pathName.includes("/game/") ? true : false);
  }, [pathName]);

  const openStat = (value) => {
    searchToggle(false);
    themeToggle(false);
    statsToggle(true);
    setStat(value);
  };

  const openLocalStat = (value) => {
    openStat("");
    setLocalStat(value);
  };

  if (isEmbed) return null;

  return (
    <div className={`desktop-nav ${hide && "hide"}`}>
      <a onClick={() => router.push("/")} className="nav-logo">
        <img
          className={`logo ${glow && "glow"}`}
          src="https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
          alt=""
        />
        <div className={`logo-name ${glow && "glow"}`}>LEGiON</div>
      </a>
      <div className="right-cont">
        <Search games={games} />
        {/* <div className="nav-btn" onClick={() => openStat("Most played")}>
          Most Played
        </div>
        <div className="nav-btn" onClick={() => openStat("Trending")}>
          Trending
        </div> */}
        {/* <div className="nav-btn" onClick={() => openStat("New")}>
          Newest
        </div>
        <div className="nav-btn" onClick={() => openStat("Featured")}>
          Featured
        </div> */}
        {/* <div
          onClick={() => {
            searchToggle(true);
            statsToggle(false);
            themeToggle(false);
          }}
          className="nav-btn"
        >
          Search
        </div> */}
        <div
          onClick={() => randomGame()}
          className="nav-btn"
          title="Try Random Game"
        >
          <i className="ri-exchange-funds-line"></i>
        </div>
        <div
          onClick={() => openLocalStat("favourites")}
          className="nav-btn"
          title="Your Favourites"
        >
          <i className="ri-heart-2-fill"></i>
        </div>
        <div
          onClick={() => openLocalStat("recents")}
          className="nav-btn"
          title="Recently Played"
        >
          <i className="ri-history-line"></i>
        </div>
        <div
          onClick={() => themeToggle(true)}
          className="nav-btn"
          title="Site Theme"
        >
          <i className="bx bx-palette"></i>
        </div>
        <div className="login-btn">Login</div>
      </div>
    </div>
  );
}

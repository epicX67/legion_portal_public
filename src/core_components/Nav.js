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
  const [hideSearch, setHideSearch] = useState(false);

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
    setHideSearch(pathName.includes("/search") ? true : false);
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
    <div
      className={`desktop-nav ${hide && "hide"} ${
        hideSearch && "disableInMobile"
      }`}
    >
      <a onClick={() => router.push("/")} className="nav-logo">
        <div className={`logo-ico ${glow && "glow"}`} alt="" />
        <div className={`logo-name ${glow && "glow"}`}>LEGiON</div>
      </a>
      <div className="right-cont">
        {!hideSearch ? (
          <Search games={games} />
        ) : (
          <div style={{ marginLeft: "auto" }}> </div>
        )}
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
          className="nav-btn tooltip random-btn"
          // title="Try Random Game"
        >
          <i className="ri-exchange-funds-line"></i>
        </div>
        <div
          onClick={() => openLocalStat("favourites")}
          className="nav-btn tooltip fevorite-btn"
          // title="Your Favourites"
        >
          <i className="ri-heart-2-fill"></i>
        </div>
        <div
          onClick={() => openLocalStat("recents")}
          className="nav-btn tooltip recent-btn"
          // title="Recently Played"
        >
          <i className="ri-history-line"></i>
        </div>
        <div
          onClick={() => themeToggle(true)}
          className="nav-btn tooltip theme-btn"
          // title="Site Theme"
        >
          <i className="ri-palette-line"></i>
        </div>
        <div className="login-btn">Login</div>
      </div>
    </div>
  );
}

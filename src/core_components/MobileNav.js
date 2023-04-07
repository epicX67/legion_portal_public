"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./MobileNav.scss";

export default function MobileNav({
  searchToggle,
  themeToggle,
  theme,
  setStat,
  setLocalStat,
  statsToggle,
  localStat,
  showSearch,
  games,
  randomGame,
  isEmbed,
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [expand, setExpand] = useState(false);
  const [glow, setGlow] = useState(false);

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

  useEffect(() => {
    setGlow(pathName.includes("/game/") ? true : false);
  }, [pathName]);

  return (
    <>
      {/* <div className={`mobile-sidebar ${expand && "expand"}`}>
        <div
          className="legionSidebarLogo"
          onClick={() => {
            router.push("/");
            setExpand(false);
          }}
        >
          <img
            className="logo"
            alt="logo"
            src="https://cdn.discordapp.com/attachments/918131950106083378/1068795423600410684/logo.png"
          />
          <div className="logoTitle">LEGiON Apps</div>
        </div>

        <div className="topButtonSet">
          <button
            className={pathName === "/" ? "enabled" : ""}
            onClick={() => {
              router.push("/");
              setExpand(false);
            }}
          >
            <i className="ri-home-line"></i>
            Home
          </button>
          <button
            className={pathName.includes("/search") ? "enabled" : ""}
            onClick={() => {
              router.push("/search");
              setExpand(false);
            }}
          >
            <i className="ri-search-2-line"></i>
            Search
          </button>
          <button>
            <i className="ri-trophy-line"></i>
            Top List
          </button>
        </div>
        <div className="categoryTitle">Categories</div>
        <div className="bottomButtonSet">
          <button
            className={pathName.includes("/category/games") ? "enabled" : ""}
            onClick={() => {
              router.push("/category/games");
              setExpand(false);
            }}
          >
            <i className="ri-gamepad-line"></i>
            Games
          </button>
          <button>
            <i className="ri-calculator-line"></i>
            Tools
          </button>
          <button>
            <i className="ri-home-smile-2-line"></i>
            Social
          </button>
          <button>
            <i className="ri-file-list-3-line"></i>
            News
          </button>
          <button>
            <i className="ri-shopping-basket-2-line"></i>
            Shopping
          </button>
          <button>
            <i className="ri-heart-line"></i>
            Lifestyle
          </button>
        </div>
      </div> */}

      <div className="mobile-down-nav">
        <button
          className={localStat === "recents" ? "enabled" : ""}
          onClick={() => openLocalStat("recents")}
        >
          {localStat === "recents" ? (
            <i className="ri-history-fill"></i>
          ) : (
            <i className="ri-history-line"></i>
          )}
          Recent
        </button>
        {/* <button
          className={theme ? "enabled" : ""}
          onClick={() => themeToggle(true)}
        >
          {theme ? (
            <i className="ri-palette-fill" style={{ fontWeight: "normal" }}></i>
          ) : (
            <i className="ri-palette-line"></i>
          )}
          Theme
        </button> */}
        <button
          className={pathName.includes("/shorts") ? "enabled" : ""}
          onClick={() => router.push("/shorts")}
        >
          {!pathName.includes("/shorts") ? (
            <i
              className="ri-exchange-line"
              style={{ fontWeight: "normal" }}
            ></i>
          ) : (
            <i className="ri-exchange-fill"></i>
          )}
          Shorts
        </button>
        <button onClick={() => router.push("/")}>
          <img
            className={`logo ${glow && "glow"}`}
            alt="logo"
            src="https://cdn.discordapp.com/attachments/918131950106083378/1068795423600410684/logo.png"
          />
        </button>
        <button
          className={localStat === "favourites" ? "enabled" : ""}
          onClick={() => openLocalStat("favourites")}
        >
          {localStat === "favourites" ? (
            <i className="ri-heart-2-fill"></i>
          ) : (
            <i className="ri-heart-2-line"></i>
          )}
          Fevorites
        </button>
        <button onClick={() => randomGame()}>
          <i className="ri-exchange-funds-line"></i>
          Play
        </button>
      </div>
    </>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./StatsPanel.scss";

export default function StatsPanel({
  games = [],
  type,
  localType = "",
  setLocalType,
  state,
  setState,
  isEmbed,
}) {
  const [stats, setStats] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (localType === "") {
      setStats(games.filter((item) => item.section === type));
      return;
    }

    let localGames = JSON.parse(localStorage.getItem(localType));
    if (!localGames) return;
    const nameOnly = games.map((item) => item.name);
    setStats(localGames.map((item) => games[nameOnly.indexOf(item)]));
  }, [games, type, localType]);

  const handleClick = (itemName) => {
    setState(false);
    router.push(`/game/${itemName.toLowerCase()}`);
  };

  const closePanel = () => {
    if (localType !== "") {
      setLocalType("");
    }
    setState(false);
  };

  return (
    state && (
      <div className="stats-panel">
        <div onClick={closePanel} className="touchBlocker"></div>
        <div className="stat-container">
          <div className="titleBar">
            <div className="title">
              {localType === "favourites" && "Your Favourites"}
              {localType === "recents" && "Recently Played"}
              {type !== "" && type}
            </div>
            <i className="ri-close-fill" onClick={() => closePanel()}></i>
          </div>
          <div className="resultList">
            {stats.map((item, key) => (
              <a key={key} className="resultCard">
                <div
                  className="card-logo"
                  style={{
                    backgroundImage: "url(" + item.squareImage + ")",
                  }}
                ></div>
                <div
                  className="card-title"
                  onClick={() => handleClick(item.name)}
                >
                  {item.name}
                </div>
                <div className="stat-actions">
                  <div
                    onClick={() => handleClick(item.name)}
                    className="action-btn light"
                  >
                    Play
                  </div>
                </div>
              </a>
            ))}
            {stats.length === 0 && (
              <div key="404NotFound" className="resultCardNotFound">
                <i className="ri-emotion-sad-line"></i>
                <div className="card-title">Nothing is there</div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

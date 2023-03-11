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

  if (isEmbed) return null;

  return (
    state && (
      <div className="stats-panel">
        <div className="resultList">
          {stats.map((item, key) => (
            <a
              onClick={() => {
                setState(false);
                router.push(`/game/${item.name}`);
              }}
              key={key}
              className="resultCard"
            >
              <div
                className="card-logo"
                style={{
                  backgroundImage: "url(" + item.squareImage + ")",
                }}
              ></div>
              <div className="card-title">{item.name}</div>
            </a>
          ))}
          {stats.length === 0 && (
            <div key="404NotFound" className="resultCardNotFound">
              <i className="ri-emotion-sad-line"></i>
              <div className="card-title">Nothing is there</div>
            </div>
          )}
        </div>
        <button
          onClick={() => {
            if (localType !== "") {
              setLocalType("");
            }
            setState(false);
          }}
        >
          Close
        </button>
      </div>
    )
  );
}

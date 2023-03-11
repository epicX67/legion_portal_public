"use client";
import Nav from "@/core_components/Nav";
import ThemeSelector from "@/dynamic_pages/ThemeSelector";
import React, { useState } from "react";

export default function RootClientWrapper() {
  const [showSearch, setShowSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stat, setStat] = useState("");
  const [localStat, setLocalStat] = useState("");
  const [showMode, setShowMode] = useState(false);
  const [games, setGames] = useState([]);

  return (
    <>
      <Nav
        setStat={setStat}
        setLocalStat={setLocalStat}
        statsToggle={setShowStats}
        searchToggle={setShowSearch}
        themeToggle={setShowMode}
        games={games}
        randomGame={() => {
          //   if (games.length > 0) {
          //     navigate(`/game/${shuffle(games)[0].name}`);
          //   }
        }}
      />
      <ThemeSelector show={showMode} toggle={setShowMode} />
    </>
  );
}

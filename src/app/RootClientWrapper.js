"use client";
// import Nav from "@/core_components/Nav";
import Sidebar from "@/core_components/Sidebar";
import StatsPanel from "@/dynamic_pages/StatsPanel";
import ThemeSelector from "@/dynamic_pages/ThemeSelector";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Nav = dynamic(() => import("@/core_components/Nav"), { ssr: false });

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
      <Sidebar
        setStat={setStat}
        setLocalStat={setLocalStat}
        statsToggle={setShowStats}
        searchToggle={setShowSearch}
        themeToggle={setShowMode}
        // isEmbed={isEmbed}
        games={[]}
      />
      <ThemeSelector show={showMode} toggle={setShowMode} />
      <StatsPanel
        // games={games}
        games={[]}
        type={stat}
        localType={localStat}
        setLocalType={setLocalStat}
        state={showStats}
        setState={setShowStats}
        // isEmbed={isEmbed}
      />
    </>
  );
}

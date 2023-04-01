"use client";
import MobileNav from "@/core_components/MobileNav";
// import Nav from "@/core_components/Nav";
import Sidebar from "@/core_components/Sidebar";
import StatsPanel from "@/dynamic_pages/StatsPanel";
import ThemeSelector from "@/dynamic_pages/ThemeSelector";
import { shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";
const Nav = dynamic(() => import("@/core_components/Nav"), { ssr: false });

export default function RootClientWrapper({ games }) {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [stat, setStat] = useState("");
  const [localStat, setLocalStat] = useState("");
  const [showMode, setShowMode] = useState(false);
  const pathName = usePathname();

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
          if (games.length > 0) {
            router.push(`/game/${shuffle(games)[0].name.toLowerCase()}`);
          }
        }}
      />
      {!pathName.includes("/search") && (
        <MobileNav
          setStat={setStat}
          setLocalStat={setLocalStat}
          statsToggle={setShowStats}
          searchToggle={setShowSearch}
          themeToggle={setShowMode}
          theme={showMode}
          showSearch={showSearch}
          localStat={localStat}
          games={games}
          randomGame={() => {
            if (games.length > 0) {
              router.push(`/game/${shuffle(games)[0].name.toLowerCase()}`);
            }
          }}
        />
      )}

      <Sidebar
        setStat={setStat}
        setLocalStat={setLocalStat}
        statsToggle={setShowStats}
        searchToggle={setShowSearch}
        themeToggle={setShowMode}
        randomGame={() => {
          if (games.length > 0) {
            router.push(`/game/${shuffle(games)[0].name.toLowerCase()}`);
          }
        }}
        games={games}
      />
      <ThemeSelector show={showMode} toggle={setShowMode} />
      <StatsPanel
        games={games}
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

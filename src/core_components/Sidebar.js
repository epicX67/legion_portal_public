import React from "react";
import { categories, shuffle } from "../res/data";
import { useRouter } from "next/navigation";
import "./Sidebar.scss";

export default function Sidebar({
  searchToggle,
  themeToggle,
  setStat,
  setLocalStat,
  statsToggle,
  games,
  isEmbed,
  randomGame,
}) {
  const router = useRouter();

  const openStat = (value) => {
    setLocalStat("");
    searchToggle(false);
    statsToggle(true);
    setStat(value);
  };

  if (isEmbed) return null;

  return (
    <div className="sidebar">
      <div onClick={() => router.push("/")} className="sidebar-item">
        <i className="ri-home-7-line"></i>
        <p>Home</p>
      </div>
      <div
        onClick={() => {
          router.push("/search");
        }}
        className="sidebar-item"
      >
        <i className="ri-search-line"></i>
        <p>Search</p>
      </div>
      <div onClick={() => randomGame()} className="sidebar-item">
        <i className="ri-bell-line"></i>
        <p>Random Game</p>
      </div>
      <div onClick={() => router.push("/shorts")} className="sidebar-item">
        <i className="ri-exchange-line"></i>
        <p>LEGiON Shorts</p>
      </div>
      <div onClick={() => openStat("Most played")} className="sidebar-item">
        <i className="ri-trophy-line"></i>
        <p>Most played</p>
      </div>
      <div onClick={() => openStat("Trending")} className="sidebar-item">
        <i className="ri-fire-line"></i>
        <p>Trending</p>
      </div>
      <div onClick={() => openStat("New")} className="sidebar-item">
        <i className="ri-star-line"></i>
        <p>Newest</p>
      </div>
      <div onClick={() => openStat("Featured")} className="sidebar-item">
        <i className="ri-pushpin-line"></i>
        <p>Featured</p>
      </div>

      {categories.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            searchToggle(false);
            statsToggle(false);
            themeToggle(false);
            router.push(`/category/${item.title}`);
          }}
          className="sidebar-item"
        >
          <i className={item.ico}></i>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

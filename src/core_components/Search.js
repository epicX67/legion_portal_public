"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Search.scss";
import { categories } from "@/res/data";

export default function Search({ games = [], isEmbed }) {
  const [searchStr, setSearchStr] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [findGames, setFindGames] = useState([]);
  const [findCategory, setFindCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const nSearch = searchStr.toLowerCase().trim();
    if (nSearch === "") {
      setFindGames([]);
      setFindCategory([]);
      return;
    }

    const f1 = games.filter((item) =>
      item.name.toLowerCase().includes(nSearch)
    );

    const f2 = categories.filter((item) =>
      item.title.toLowerCase().includes(nSearch)
    );

    setFindGames(f1);
    setFindCategory(f2);
  }, [searchStr]);

  const handleItemClick = (url) => () => {
    router.push(url);
    setSearchMode(false);
    setSearchStr("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push(`/search/${searchStr}`);
    }
  };

  if (isEmbed) return null;

  return (
    <div className="inputBox">
      <i className="ri-search-line"></i>
      {/* <i className="ri-close-line"></i> */}
      <div
        className="searchButton"
        onClick={() => router.push(`/search/${searchStr}`)}
      >
        <i className="ri-search-line"></i>
      </div>
      <input
        onClick={() => setSearchMode(true)}
        onKeyDown={(e) => handleKeyDown(e)}
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
        type="text"
        name="search"
        placeholder="search"
        className={`${
          (findGames.length > 0 || findCategory.length > 0) &&
          searchMode &&
          "searchInputMode"
        }`}
      ></input>
      {searchMode && (findGames.length > 0 || findCategory.length > 0) && (
        <>
          <div className="searchResults">
            {findCategory.map((item, index) => (
              <div
                key={"category_" + index}
                className="item"
                onClick={handleItemClick(`/category/${item.title}`)}
              >
                <i className="ri-pages-line iconCover"></i>

                <div className="title">{item.title}</div>
              </div>
            ))}
            {findGames.map((item, index) => (
              <div
                key={"game_" + index}
                className="item"
                onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
              >
                <div
                  style={{
                    backgroundImage: "url(" + item.squareImage + ")",
                  }}
                  className="cover"
                ></div>
                <div className="title">{item.name}</div>
              </div>
            ))}
          </div>
          <div
            onClick={() => setSearchMode(false)}
            className="touchBlocker"
          ></div>
        </>
      )}
    </div>
  );
}

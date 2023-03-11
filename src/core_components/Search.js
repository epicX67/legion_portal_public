"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./Search.scss";

export default function Search({ games = [], isEmbed }) {
  const [searchStr, setSearchStr] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [findGames, setFindGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const nSearch = searchStr.toLowerCase().trim();
    if (nSearch === "") {
      setFindGames([]);
      return;
    }

    const f1 = games.filter((item) =>
      item.name.toLowerCase().includes(nSearch)
    );

    setFindGames(f1);
  }, [searchStr]);

  const handleItemClick = (url) => () => {
    router.push(url);
    setSearchMode(false);
    setSearchStr("");
  };

  if (isEmbed) return null;

  return (
    <div className="inputBox">
      <i className="ri-search-line"></i>
      {/* <i className="ri-close-line"></i> */}
      <input
        onClick={() => setSearchMode(true)}
        value={searchStr}
        onChange={(e) => setSearchStr(e.target.value)}
        type="text"
        name="search"
        placeholder="search"
        className={`${findGames.length > 0 && searchMode && "searchInputMode"}`}
      ></input>
      {searchMode && findGames.length > 0 && (
        <>
          <div className="searchResults">
            {findGames.map((item, index) => (
              <div
                key={index}
                className="item"
                onClick={handleItemClick(`/game/${item.name}`)}
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

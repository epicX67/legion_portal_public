"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { categories, collections, sections } from "@/res/data";

export default function SearchClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [searchStr, setSearchStr] = useState(() =>
    params?.name ? params.name : ""
  );
  const [findGames, setFindGames] = useState([]);
  const [findCategory, setFindCategory] = useState([]);
  const [findCollection, setFindCollection] = useState([]);
  const [findSection, setFindSection] = useState([]);

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

    const f3 = collections.filter((item) =>
      item.name.toLowerCase().includes(nSearch)
    );

    const f4 = sections.filter((item) =>
      item.name.toLowerCase().includes(nSearch)
    );

    setFindGames(f1);
    setFindCategory(f2);
    setFindCollection(f3);
    setFindSection(f4);
  }, [searchStr]);

  return (
    <div className="searchPageContainer">
      <div className="searchBox">
        <i className="ri-search-line"></i>
        <input
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          type="text"
          name="search"
          placeholder="search"
          className="search"
        ></input>
      </div>
      <div className="resultsBox">
        {findCategory.map((item, key) => (
          <div key={"category" + key} className="box">
            <div
              className="imageCont"
              onClick={() => router.push(`/category/${item.title}`)}
            >
              <i className="ri-layout-4-line category"></i>
            </div>
            <div className="rCont">
              <div
                className="cardTitle"
                onClick={() => router.push(`/category/${item.title}`)}
              >
                {item.title}
              </div>
              <div className="cardType">{"Category"}</div>
              <div className="rating">{`-`}</div>
            </div>
          </div>
        ))}
        {findCollection.map((item, key) => (
          <div key={"collection" + key} className="box">
            <div
              className="imageCont"
              onClick={() => router.push(`/collection/${item.name}`)}
            >
              <i className="ri-collage-line collection"></i>
            </div>
            <div className="rCont">
              <div
                className="cardTitle"
                title={item.name}
                onClick={() => router.push(`/collection/${item.name}`)}
              >
                {item.name}
              </div>
              <div className="cardType">{"Collection"}</div>
              <div className="rating">{`-`}</div>
            </div>
          </div>
        ))}
        {findSection.map((item, key) => (
          <div key={"collection" + key} className="box">
            <div
              className="imageCont"
              onClick={() => router.push(`/section/${item.name}`)}
            >
              <i className="ri-layout-left-2-line section"></i>
            </div>
            <div className="rCont">
              <div
                className="cardTitle"
                title={item.name}
                onClick={() => router.push(`/section/${item.name}`)}
              >
                {item.name}
              </div>
              <div className="cardType">{"Section"}</div>
              <div className="rating">{`-`}</div>
            </div>
          </div>
        ))}
        {findGames.map((item, key) => (
          <div key={"game" + key} className="box">
            <div
              className="imageCont"
              style={{
                backgroundImage: `url('${
                  item?.squareImage ? item.squareImage : ""
                }')`,
              }}
              onClick={() => router.push(`/game/${item.name.toLowerCase()}`)}
            ></div>
            <div className="rCont">
              <div
                className="cardTitle"
                onClick={() => router.push(`/game/${item.name.toLowerCase()}`)}
              >
                {item.name}
              </div>
              <div className="cardType">{"game"}</div>
              <div className="rating">
                {item?.rating ? item.rating : "Unrated"}
                {item?.rating && <i className="ri-star-fill"></i>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

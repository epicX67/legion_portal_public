"use client";
import { categories, collections } from "@/res/data";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [collectionName, setCollectionName] = useState("");
  const [collectionBackground, setCollectionBackground] = useState(null);
  const [collectionTarget, setCollectionTarget] = useState(null);
  const [yourFavourite, setYourFavourite] = useState(false);
  const data = useMemo(() => games, [games]);

  const handleItemClick = (url) => {
    router.push(url);
  };

  const tagFound = (tags) => {
    return tags.find((item) =>
      collectionTarget === null
        ? false
        : item.toLowerCase() === collectionTarget.toLowerCase()
    )
      ? true
      : false;
  };

  useEffect(() => {
    const collection = collections.find(
      (item) =>
        item.name.toLowerCase().replaceAll(" ", "%20") ===
        params.name.toLowerCase()
    );

    if (!collection || collection.target === "") {
      router.replace("/404");
    } else {
      setCollectionName(collection.name);
      setCollectionBackground(collection.bg ? collection.bg : null);
      setCollectionTarget(collection.target);
    }

    window.scrollTo(0, 0);
  }, [params]);
  let x = 1;
  const total = useMemo(() => {
    return data.filter((item, key) =>
      tagFound(item.category ? item.category.split(",") : [])
    ).length;
  }, [collectionTarget]);
  const firstGame = useMemo(() => {
    return data.find((item, key) =>
      tagFound(item.category ? item.category.split(",") : [])
    );
  }, [collectionTarget]);

  //Handle fevourite
  const makeFavourite = (name, action) => {
    if (!action && !localStorage.getItem("collection_favourites")) {
      setYourFavourite(false);
    }

    const favourites = JSON.parse(
      localStorage.getItem("collection_favourites")
    );

    if (!action) {
      const newFavourites = favourites.filter(
        (item) => item.toLowerCase() !== name.toLowerCase()
      );
      localStorage.setItem(
        "collection_favourites",
        JSON.stringify(newFavourites)
      );
      setYourFavourite(false);
      return;
    }

    setYourFavourite(true);
    if (!favourites) {
      localStorage.setItem("collection_favourites", JSON.stringify([name]));
      return;
    }

    favourites.push(name);
    localStorage.setItem("collection_favourites", JSON.stringify(favourites));
  };
  useEffect(() => {
    const favourites = JSON.parse(
      localStorage.getItem("collection_favourites")
    );
    if (!favourites) {
      // localStorage.setItem("collection_favourites", JSON.stringify([]));
      setYourFavourite(false);
    } else {
      const isThisYourFavourite = favourites.find(
        (item) => item === collectionName
      );
      setYourFavourite(isThisYourFavourite ? true : false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  return (
    <div className="collection-main">
      <div className="collection-hero">
        <div
          className="bg"
          style={
            collectionBackground && {
              backgroundImage: `url('${collectionBackground}')`,
            }
          }
        ></div>
        <p className="subtitle">Collection ● {total} Games Total</p>
        <p className="title">{collectionName}</p>
        <p className="desc">
          But also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset sheets containing Lorem Ipsum passages, and more recently wit
        </p>
      </div>

      <div className="actions">
        <div
          className="action"
          onClick={() =>
            handleItemClick(`/game/${firstGame.name.toLowerCase()}`)
          }
        >
          <i className="ri-play-fill"></i>
        </div>
        <div
          className={`action ${yourFavourite ? "active" : ""}`}
          onClick={() => makeFavourite(collectionName, !yourFavourite)}
        >
          {yourFavourite ? (
            <i className="ri-heart-fill"></i>
          ) : (
            <i
              className="ri-heart-line"
              style={
                yourFavourite
                  ? { background: `var(--sub-background) !important` }
                  : {}
              }
            ></i>
          )}
        </div>
        <div className="pill-action">Share</div>
      </div>

      <div className="collections">
        <div className="header row">
          <div className="column">#</div>
          <div className="column">Game</div>
          <div className="column c-name"></div>
          <div className="column c-desc">Description</div>
          <div className="column c-rating">Rating</div>
          <div className="column c-score">Score</div>
          <div className="column c-play">Play Game</div>
        </div>
        {data.map(
          (item, key) =>
            tagFound(item.category ? item.category.split(",") : []) && (
              <div key={key} className="collection row">
                <div className="serial">{x++}.</div>
                <div
                  style={{
                    backgroundImage: "url(" + item.wideImage + ")",
                  }}
                  className="card-cover"
                ></div>
                <div
                  className="card-info c-name"
                  onClick={() =>
                    handleItemClick(`/game/${item.name.toLowerCase()}`)
                  }
                >
                  {item.name}
                </div>
                <div className="c-desc">3D Pirate Game</div>
                <div className="c-rating">4.5/5</div>
                <div className="c-score">860/865</div>
                <div
                  className="pill-action c-play"
                  onClick={() =>
                    handleItemClick(`/game/${item.name.toLowerCase()}`)
                  }
                >
                  Play
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

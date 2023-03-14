"use client";
import { categories, collections } from "@/res/data";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [collectionName, setCollectionName] = useState("");
  const [collectionBackground, setCollectionBackground] = useState(null);
  const [collectionTarget, setCollectionTarget] = useState(null);
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

  return (
    <div className="games-container">
      <div
        className="games-hero"
        style={
          collectionBackground && {
            backgroundImage: `url('${collectionBackground}')`,
          }
        }
      >
        <p className="title">{collectionName}</p>
      </div>

      <div className="game-list">
        {data.map(
          (item, key) =>
            tagFound(item.category ? item.category.split(",") : []) && (
              <div
                key={key}
                className="CardSetTypeA-card"
                style={{
                  backgroundImage: "url(" + item.wideImage + ")",
                }}
                onClick={() =>
                  handleItemClick(`/game/${item.name.toLowerCase()}`)
                }
              >
                <div className="card-info">{item.name}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

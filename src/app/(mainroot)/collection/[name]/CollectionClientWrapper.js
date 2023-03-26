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
  let x = 1;

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
        <p className="subtitle">Collection</p>
        <p className="title">{collectionName}</p>
      </div>

      <div className="collections">
        {data.map(
          (item, key) =>
            tagFound(item.category ? item.category.split(",") : []) && (
              <div key={key} className="collection">
                <div className="serial">{x++}.</div>
                <div
                  style={{
                    backgroundImage: "url(" + item.wideImage + ")",
                  }}
                  className="card-cover"
                ></div>
                <div
                  className="card-info"
                  onClick={() =>
                    handleItemClick(`/game/${item.name.toLowerCase()}`)
                  }
                >
                  {item.name}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

"use client";
import { categories } from "@/res/data";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function CategoryClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [categoryInfo, setCategoryInfo] = useState("");
  const [categoryBackground, setCategoryBackground] = useState(null);

  const subCategories = ["Girls Games", "Boys Games"];

  const data = useMemo(() => {
    if (params.name === "Girls Games".replaceAll(" ", "%20")) {
      return games.filter((item) => item["gender (B, G, Both)"] === "Both");
    } else if (params.name === "Boys Games".replaceAll(" ", "%20")) {
      return games.filter((item) => item["gender (B, G, Both)"] === "B");
    }

    return games;
  }, [games, params.name]);

  const handleItemClick = (url) => {
    router.push(url);
  };

  const tagFound = (tags) => {
    return tags.find((item) => item.toLowerCase() === params.name.toLowerCase())
      ? true
      : false;
  };

  useEffect(() => {
    const category = categories.find(
      (item) =>
        item.title.toLowerCase().replaceAll(" ", "%20") ===
        params.name.toLowerCase()
    );

    if (!category) {
      router.replace("/404");
    } else {
      setCategoryName(category.title);
      setCategoryInfo(category.info);
      setCategoryBackground(category.background ? category.background : null);
    }

    window.scrollTo(0, 0);
  }, [params]);
  const total = useMemo(() => {
    return data.filter(
      (item, key) =>
        tagFound(item.category ? item.category.split(",") : []) ||
        subCategories.includes(params.name.replaceAll("%20", " "))
    ).length;
  }, [params]);

  return (
    <div className="games-container">
      <div className="category-hero">
        <div
          className="bg"
          style={
            categoryBackground && {
              backgroundImage: `url('${categoryBackground}')`,
            }
          }
        ></div>
        <p className="title">
          {categoryName}
          {categoryName.indexOf("Games") === -1 ? " Games" : null}
        </p>
        <p className="subtitle">Category ● {total} Games Total</p>
        <p className="desc">{categoryInfo}</p>
      </div>

      <div className="game-list">
        {data.map(
          (item, key) =>
            (tagFound(item.category ? item.category.split(",") : []) ||
              subCategories.includes(params.name.replaceAll("%20", " "))) && (
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

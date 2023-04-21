"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/res/data";

export default function TagClientWrapper({ games }) {
  const router = useRouter();
  const tags = useMemo(() => {
    const tagSets = games.map((item) => {
      if (item?.tags) {
        return item.tags.split(";");
      } else {
        return [];
      }
    });

    let tags = [];
    tagSets.forEach((item) => (tags = [...tags, ...item]));
    return [...new Set(tags)];
  }, [games]);

  return (
    <div className="category">
      <div className="title">Tags</div>
      <div className="category-list">
        {tags.map((item, key) => (
          <div
            key={key}
            className="category-card"
            onClick={() => router.push(`/tag/${item}`)}
          >
            <div className="hash">#</div>
            <div className="rCont">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

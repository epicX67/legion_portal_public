"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { categories } from "@/res/data";

export default function CategoryClientWrapper() {
  const router = useRouter();
  return (
    <div className="category">
      <div className="title">Category</div>
      <div className="category-list">
        {categories.map((item, key) => (
          <div
            key={key}
            className="category-card"
            onClick={() => router.push(`/category/${item.title}`)}
          >
            <img src={item.background} alt="" />
            <div className="rCont">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

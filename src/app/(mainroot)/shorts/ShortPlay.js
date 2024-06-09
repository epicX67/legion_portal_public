/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {useMemo } from "react";
import "./ShortPlay.scss";
import { shuffle } from "@/res/data";
import VerticalSwipeToSlide from "./VerticalSwipe";

export default function ShortPlay({ games }) {
  const data = useMemo(() => {
    return shuffle(games, 30);
  }, []);

  return (
    <>
      <div>
        <VerticalSwipeToSlide data={data} />
      </div>
    </>
  );
}

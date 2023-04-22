"use client";
import { shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const CardSetTypeGridD = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridD"),
  { ssr: false }
);

export default function KidsPageClientWrapper({ games }) {
  const kidsGame = useMemo(() => shuffle(games, 28), []);

  return (
    <div>
      <CardSetTypeGridD title="null" data={kidsGame} />
    </div>
  );
}

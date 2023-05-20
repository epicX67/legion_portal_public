"use client";
import { shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const CardSetTypeGridG = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridG"),
  { ssr: false }
);

export default function KidsPageClientWrapper({ games }) {
  const game = useMemo(() => shuffle(games, 38), []);

  return (
    <div>
      <CardSetTypeGridG title="null" data={game} circle={true} />
    </div>
  );
}

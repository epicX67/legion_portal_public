"use client";
import { shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const CardSetTypeGridF = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridF"),
  { ssr: false }
);

export default function KidsPageClientWrapper({ games }) {
  const game = useMemo(() => shuffle(games, 43), []);

  return (
    <div>
      <CardSetTypeGridF title="null" data={game} />
    </div>
  );
}

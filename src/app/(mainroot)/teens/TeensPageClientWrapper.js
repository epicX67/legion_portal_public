"use client";
import { shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

const CardSetTypeGridE = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridE"),
  { ssr: false }
);

export default function TeensPageClientWrapper({ games }) {
  const teensGame = useMemo(() => shuffle(games, 48), []);

  return (
    <div>
      <CardSetTypeGridE title="null" data={teensGame} />
    </div>
  );
}

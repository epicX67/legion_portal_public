"use client";
import Categories from "@/components/CardSets/Categories";
import RowBar from "@/components/CardSets/RowBar";
import { categories, filterByValue, shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const CardSetTypeA = dynamic(
  () => import("@/components/CardSets/CardSetTypeA"),
  { ssr: false }
);
const PortableRowTypeA = dynamic(
  () => import("@/components/CardSets/PortableRowTypeA"),
  { ssr: false }
);

export default function HomeClientWrapper({ games }) {
  const contents = useMemo(
    () => [
      shuffle(filterByValue("row", "Row 1", games)),
      shuffle(filterByValue("row", "Row 2", games)),
      shuffle(filterByValue("row", "Row 3", games)),
      shuffle(filterByValue("row", "Row 4", games)),
      shuffle(filterByValue("row", "Row 5", games)),
      shuffle(filterByValue("row", "Row 6", games)),
      shuffle(filterByValue("row", "Row 7", games)),
      shuffle(filterByValue("row", "Row 8", games)),
      shuffle(filterByValue("row", "Row 9", games)),
      shuffle(filterByValue("row", "Row 10", games)),
      shuffle(filterByValue("row", "Row 11", games)),
      shuffle(filterByValue("row", "Row 12", games)),
      shuffle(filterByValue("row", "Row 13", games)),
      shuffle(filterByValue("gender (B, G, Both)", "B", games), 15),
      shuffle(filterByValue("gender (B, G, Both)", "B", games), 15),
      shuffle(filterByValue("gender (B, G, Both)", "B", games), 21),
      shuffle(games, 37),
      shuffle(games, 37),
      shuffle(games, 37),
      shuffle(games, 37),
      shuffle(games, 37),
      shuffle(games, 37),
    ],
    [games]
  );

  return (
    <div className="homePage">
      <CardSetTypeA title="Featured" data={contents[0]} />
      <RowBar />
      <PortableRowTypeA title="Popular" data={contents[15]} />
      <Categories title="Categories" data={categories} />
    </div>
  );
}

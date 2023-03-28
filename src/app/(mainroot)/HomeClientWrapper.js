"use client";
import Categories from "@/components/CardSets/Categories";
import Collections from "@/components/CardSets/Collections";
import RowBar from "@/components/CardSets/RowBar";
import SiteDesc from "@/components/SiteDesc";
import { categories, collections, filterByValue, shuffle } from "@/res/data";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/Hero";
const CardSetTypeA = dynamic(
  () => import("@/components/CardSets/CardSetTypeA"),
  { ssr: false }
);
const CardSetTypeB = dynamic(
  () => import("@/components/CardSets/CardSetTypeB"),
  { ssr: false }
);
const CardSetTypeSuperWide = dynamic(
  () => import("@/components/CardSets/CardSetTypeSuperWide"),
  { ssr: false }
);
const CardSetTypeCircle = dynamic(
  () => import("@/components/CardSets/CardSetTypeCircle"),
  { ssr: false }
);
const CardSetTypeSquare = dynamic(
  () => import("@/components/CardSets/CardSetTypeSquare"),
  { ssr: false }
);
const PortableRowTypeA = dynamic(
  () => import("@/components/CardSets/PortableRowTypeA"),
  { ssr: false }
);
const PortableRowTypeB = dynamic(
  () => import("@/components/CardSets/PortableRowTypeB"),
  { ssr: false }
);
const CardSetTypeGridA = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridA"),
  { ssr: false }
);
const CardSetTypeGridB = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridB"),
  { ssr: false }
);
const CardSetTypeGridC = dynamic(
  () => import("@/components/CardSets/CardSetTypeGridC"),
  { ssr: false }
);

export default function HomeClientWrapper({ games }) {
  const router = useRouter();
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

  const heroGames = useMemo(
    () => filterByValue("featured (Y or N)", "Y", games),
    [games]
  );

  return (
    <div className="homePage">
      <Hero data={heroGames} />
      <CardSetTypeA title="Featured" data={contents[0]} />
      <RowBar
        action={() => {
          if (games.length > 0) {
            router.push(`/game/${shuffle(games)[0].name.toLowerCase()}`);
          }
        }}
      />
      <PortableRowTypeA title="Popular" data={contents[15]} />
      <Categories title="Categories" data={categories} />
      <CardSetTypeB title="Most Popular" data={contents[1]} />
      <CardSetTypeSuperWide title="Big Shot Games" data={contents[12]} />
      <PortableRowTypeB title="Popular" data={contents[15]} />
      <Collections title="Collections" data={collections} />
      <CardSetTypeCircle title="Legacy Franchises" data={contents[2]} />
      <CardSetTypeA title="Noteworthy Games" data={contents[3]} />
      <CardSetTypeSquare title="Entertaining Games" data={contents[4]} />
      <CardSetTypeA title="Party Games" data={contents[5]} />
      <CardSetTypeA title="Top Rated Games" data={contents[6]} />
      <CardSetTypeSquare title="Classic Games" data={contents[7]} />
      <CardSetTypeA title="Trending Games" data={contents[8]} />
      <CardSetTypeA title="Adventure Games" data={contents[9]} />
      <CardSetTypeA title="Newly Popular" data={contents[10]} />
      <CardSetTypeSquare title="Player favorites" data={contents[11]} />
      <CardSetTypeGridB
        title="Good Games 1"
        data={contents[15]}
        circle={true}
      />
      <CardSetTypeGridB
        title="Good Games 2"
        data={contents[15]}
        circle={false}
      />
      <CardSetTypeGridB
        title="Good Games 2 Wide"
        data={contents[15]}
        circle={false}
        extraWide={true}
      />
      <CardSetTypeGridA
        title="Good Games 3"
        data={contents[13]}
        circle={true}
      />
      <CardSetTypeGridA
        title="Good Games 4"
        data={contents[14]}
        circle={false}
      />
      <CardSetTypeGridA
        title="Good Games 4 wide"
        data={contents[13]}
        circle={false}
        extraWide={true}
      />
      <CardSetTypeGridC title="Mega Column" data={contents[16]} />
      <SiteDesc />
    </div>
  );
}

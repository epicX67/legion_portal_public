import { collections } from "@/res/data";
import CollectionClientWrapper from "./CollectionClientWrapper";
import "./styles.scss";

export function generateStaticParams() {
  return collections.map((item, index) => ({
    name: item.name,
  }));
}

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function Collections({ params }) {
  const games = await getGames();

  return <CollectionClientWrapper params={params} games={games} />;
}

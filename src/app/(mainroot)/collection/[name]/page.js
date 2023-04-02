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

export async function generateMetadata({ params }) {
  const collection = collections.find(
    (item) =>
      item.name.toLowerCase().replaceAll(" ", "%20") ===
      params.name.toLowerCase()
  );

  return {
    title: collection.name,
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function Collections({ params }) {
  const games = await getGames();

  return <CollectionClientWrapper params={params} games={games} />;
}

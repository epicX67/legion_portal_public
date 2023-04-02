import { categories } from "@/res/data";
import CategoryClientWrapper from "./CategoryClientWrapper";
import "./styles.scss";

export function generateStaticParams() {
  return categories.map((item, index) => ({
    name: item.title,
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
  const category = categories.find(
    (item) =>
      item.title.toLowerCase().replaceAll(" ", "%20") ===
      params.name.toLowerCase()
  );

  return {
    title: category.title.charAt(0).toUpperCase() + category.title.slice(1),
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

export default async function Categories({ params }) {
  const games = await getGames();

  return <CategoryClientWrapper params={params} games={games} />;
}

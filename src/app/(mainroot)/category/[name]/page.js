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

export default async function Categories({ params }) {
  const games = await getGames();

  return <CategoryClientWrapper params={params} games={games} />;
}

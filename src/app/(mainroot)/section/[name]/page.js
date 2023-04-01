import { sections } from "@/res/data";
import SectionClientWrapper from "./SectionClientWrapper";
import "./styles.scss";

export function generateStaticParams() {
  return sections.map((item, index) => ({
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

export default async function Sections({ params }) {
  const games = await getGames();

  return <SectionClientWrapper params={params} games={games} />;
}

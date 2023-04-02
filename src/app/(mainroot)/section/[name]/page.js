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

export async function generateMetadata({ params }) {
  const section = sections.find(
    (item) =>
      item.name.toLowerCase().replaceAll(" ", "%20") ===
      params.name.toLowerCase()
  );

  return {
    title: section.name.charAt(0).toUpperCase() + section.name.slice(1),
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

export default async function Sections({ params }) {
  const games = await getGames();

  return <SectionClientWrapper params={params} games={games} />;
}

import TagClientWrapper from "./TagClientWrapper";
import "./styles.scss";

const getTagsFromGames = (games) => {
  const tagSets = games.map((item) => {
    if (item?.tags) {
      return item.tags.split(";");
    } else {
      return [];
    }
  });

  let tags = [];
  tagSets.forEach((item) => (tags = [...tags, ...item]));
  return [...new Set(tags)];
};

export async function generateStaticParams() {
  const games = await getGames();
  return getTagsFromGames(games).map((item) => ({
    name: item,
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
  return {
    title: params.name + "tag",
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

  return <TagClientWrapper params={params} games={games} />;
}

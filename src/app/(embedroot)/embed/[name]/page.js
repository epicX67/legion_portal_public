import "./page.scss";
export const dynamicParams = false;

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export async function generateStaticParams() {
  const games = await getGames();
  return games.map((item, index) => ({
    name: item.name.toLowerCase().trim(),
  }));
}

function getGame(games, params) {
  const gameName = params.name.toLowerCase().trim();
  const ret = games.find(
    (item) => item.name.toLowerCase().trim().replaceAll(" ", "%20") === gameName
  );
  return ret;
}

export async function generateMetadata({ params }) {
  const games = await getGames();
  const game = getGame(games, params);

  return {
    title: game.name,
    icons: [{ url: game.squareImage }],
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

export default async function GameRun({ params }) {
  const games = await getGames();
  const game = getGame(games, params);

  return (
    <>
      <iframe
        className="embedIframe"
        title={game.name}
        src={game.link}
        allowFullScreen={true}
      ></iframe>
    </>
  );
}

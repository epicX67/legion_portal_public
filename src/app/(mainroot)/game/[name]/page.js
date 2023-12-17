import dynamic from "next/dynamic";
export const dynamicParams = false;
const Play = dynamic(() => import("./Play"), { ssr: false });

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

export async function generateMetadata({ params }) {
  const games = await getGames();
  const game = getGame(games, params);

  return {
    title: game.name,
    // icons: [{ url: game.squareImage }],
    keywords:
      "Online Games, Free Online Games, Browser Games, Play Games, Web Games, HTML5 Games, Flash Games, Casual Games, Arcade Games, Adventure Games, Puzzle Games, Action Games, Multiplayer Games, Mobile Games, Fun Games, Addictive Games, Skill Games, Strategy Games, Simulation Games, Racing Games, Shooting Games, Sports Games, Board Games, Card Games, Kids Games, Educational Games, Girls Games, Boys Games, Best Online Games, Top Online Games, Game Collection, Game Portal, Gaming Platform",
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
    openGraph: {
      title: game.name + " 🕹️ Play on LEGiON Portal for free!",
      description: game.description,
      url: "https://legion-portal.vercel.app/game/" + game.name,
      siteName: "Legion Portal",
      images: [
        {
          url: game.squareImage,
          width: 600,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
      keywords:
        "Online Games, Free Online Games, Browser Games, Play Games, Web Games, HTML5 Games, Flash Games, Casual Games, Arcade Games, Adventure Games, Puzzle Games, Action Games, Multiplayer Games, Mobile Games, Fun Games, Addictive Games, Skill Games, Strategy Games, Simulation Games, Racing Games, Shooting Games, Sports Games, Board Games, Card Games, Kids Games, Educational Games, Girls Games, Boys Games, Best Online Games, Top Online Games, Game Collection, Game Portal, Gaming Platform",
    },
    twitter: {
      card: game.wideImage,
    },
  };
}

function getGame(games, params) {
  const gameName = params.name.toLowerCase().trim();
  const ret = games.find(
    (item) => item.name.toLowerCase().trim().replaceAll(" ", "%20") === gameName
  );
  return ret;
}

export default async function GameRun({ params }) {
  //   const game = await getGame(params);
  const games = await getGames();
  const game = getGame(games, params);

  return (
    <>
      <Play games={games} game={game} />
    </>
    // <div>
    //   <h1>Current Game - {game.name}</h1>
    //   <h1>Games -</h1>
    //   <div>
    //     {games.map((item) => (
    //       <p>{item.name}</p>
    //     ))}
    //   </div>
    // </div>
  );
}

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

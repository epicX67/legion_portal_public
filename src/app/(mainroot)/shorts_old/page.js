import dynamic from "next/dynamic";
const ShortPlay = dynamic(() => import("./ShortPlay"), { ssr: false });

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function GameRun({ params }) {
  const games = await getGames();

  return (
    <>
      <ShortPlay games={games} />
    </>
  );
}

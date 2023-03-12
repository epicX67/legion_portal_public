import HomeClientWrapper from "./HomeClientWrapper";

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function Home() {
  const games = await getGames();

  return (
    <>
      <HomeClientWrapper games={games} />
    </>
  );
}

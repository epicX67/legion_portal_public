import SearchClientWrapper from "./SearchClientWrapper";
import "./styles.scss";

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export const metadata = {
  title: "Search - LEGiON Portal",
};

export default async function Search({ params }) {
  const games = await getGames();

  return <SearchClientWrapper params={params} games={games} />;
}

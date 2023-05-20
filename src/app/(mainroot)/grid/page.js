import PageClientWrapper from "./PageClientWrapper";
import "./styles.scss";

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function Page() {
  const games = await getGames();

  return (
    <div className="kidsPanel">
      <PageClientWrapper games={games} />
    </div>
  );
}

import React from "react";
import "./styles.scss";
import TagClientWrapper from "./TagClientWrapper";

export const metadata = {
  title: "Tags - LEGiON Portal",
};

async function getGames() {
  const res = await fetch(
    `https://raw.githubusercontent.com/Xperiement/repo/main/sample.json`
  );
  const games = await res.json();
  return games;
}

export default async function page() {
  const games = await getGames();
  return <TagClientWrapper games={games} />;
}

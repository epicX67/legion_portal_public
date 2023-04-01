"use client";
import { filterByValue, sections } from "@/res/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SectionClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [sectionName, setSectionName] = useState("");
  const [sectionGames, setSectionGames] = useState([]);
  const handleItemClick = (url) => {
    router.push(url);
  };

  useEffect(() => {
    const section = sections.find(
      (item) =>
        item.name.toLowerCase().replaceAll(" ", "%20") ===
        params.name.toLowerCase()
    );

    if (!section || section.target === "") {
      router.replace("/404");
    } else {
      setSectionName(section.name);
      setSectionGames(filterByValue(section.target, section.value, games));
    }

    window.scrollTo(0, 0);
  }, [params]);

  return (
    <div className="games-container">
      <div className="section-hero">
        <div
          className="bg"
          style={{
            backgroundImage: `url('https://cdn.discordapp.com/attachments/961665882671677493/1091655923598106634/w66m_ob1h_190906.jpg')`,
          }}
        ></div>
        <p className="route">{`Home > Section`}</p>
        <p className="title">{sectionName}</p>
        <p className="subtitle">Section ● {sectionGames.length} Games Total</p>
      </div>

      <div className="game-list">
        {sectionGames.map((item, key) => (
          <div
            key={key}
            className="CardSetTypeA-card"
            style={{
              backgroundImage: "url(" + item.wideImage + ")",
            }}
            onClick={() => handleItemClick(`/game/${item.name.toLowerCase()}`)}
          >
            <div className="card-info">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function TagClientWrapper({ params, games = [] }) {
  const router = useRouter();
  const [tagName, setTagName] = useState("#" + params.name);

  const data = useMemo(() => {
    return games.filter((item) => {
      if (item?.tags) {
        return item.tags.includes(params.name);
      }

      return false;
    });
  }, [games, params.name]);

  const handleItemClick = (url) => {
    router.push(url);
  };

  return (
    <div className="games-container">
      <div className="category-hero">
        <div
          className="bg"
          style={{
            backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Zt11a1j3hHd4gV_jS_BfAf0NEnsOiFkkDckZYflSMluN0A1HcYjcuXHiEN_9s-d8w3s&usqp=CAU')`,
          }}
        ></div>
        <p className="title">{tagName}</p>
        <p className="subtitle">Tag ● {data?.length} Games Total</p>
        <p className="desc">Games with this tag</p>
      </div>

      <div className="game-list">
        {data?.map((item, key) => (
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

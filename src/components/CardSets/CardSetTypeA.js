"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeA.scss";

export default function CardSetTypeA({ title, data = [], call = () => {} }) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="CardSetTypeA">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.wideImage && (
              <div>
                <div
                  key={key}
                  className="CardSetTypeA-card"
                  style={{ backgroundImage: "url(" + item.wideImage + ")" }}
                  onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
                  onDrag={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {Object.keys(flags).includes(item.flag) && (
                    <img src={flags[item.flag]} alt="flag" />
                  )}

                  <div className="card-info">{item.name}</div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

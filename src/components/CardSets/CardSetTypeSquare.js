"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeSquare.scss";

export default function CardSetTypeSquare({
  title,
  data = [],
  call = () => {},
}) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="content square">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.squareImage && (
              <div key={key}>
                <div
                  className="CardSetTypeA-card content-card"
                  style={{ backgroundImage: "url(" + item.squareImage + ")" }}
                  onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
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

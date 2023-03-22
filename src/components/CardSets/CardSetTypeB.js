"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./CardSetTypeB.scss";

export default function CardSetTypeB({ title, data = [], call = () => {} }) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="content CardSetTypeB vertical">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.tallImage && (
              <div
                key={key}
                className="content-card CardSetTypeB-card"
                onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
              >
                <div
                  className="image"
                  style={{ backgroundImage: "url(" + item.tallImage + ")" }}
                ></div>
                <div className="card-info">{item.name}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

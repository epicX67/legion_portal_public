"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeCircle.scss";

export default function CardSetTypeCircle({
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
    <div className="content circle">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.circleImage && (
              <div key={key}>
                <div
                  className="CardSetTypeA-card content-card"
                  style={{ backgroundImage: "url(" + item.circleImage + ")" }}
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

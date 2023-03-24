"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeSuperWide.scss";

export default function CardSetTypeSuperWide({
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
    <div className="content wide">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.wideImage && (
              <div key={key}>
                <div
                  className="content-card"
                  style={{ backgroundImage: "url(" + item.wideImage + ")" }}
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

"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeA.scss";

export default function CardSetTypeA({
  title,
  data = [],
  call = () => {},
  id = "id_" + Date.now(),
}) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="CardSetTypeA">
      <div className="titleBar">
        <p>{title}</p>
        <div className="actions">
          <i
            className="ri-arrow-left-s-line"
            onClick={() => {
              document.getElementById(id).classList.add("smoothScroll");
              document.getElementById(id).scrollLeft -= 200;
              document.getElementById(id).classList.remove("smoothScroll");
            }}
          ></i>
          <i
            className="ri-arrow-right-s-line"
            onClick={() => {
              document.getElementById(id).classList.add("smoothScroll");
              document.getElementById(id).scrollLeft += 200;
              document.getElementById(id).classList.remove("smoothScroll");
            }}
          ></i>
          <div>See More</div>
        </div>
      </div>
      <div id={id} ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.wideImage && (
              <div key={key}>
                <div
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

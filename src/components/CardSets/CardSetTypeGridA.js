"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./CardSetTypeGridA.scss";

export default function CardSetTypeGridA({
  title,
  data = [],
  circle = false,
  extraWide = false,
  call = () => {},
  id = "id_" + Date.now() + Math.random(),
}) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="grid">
      <div className="titleBar">
        <p className="title">{title}</p>
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
      <div
        id={id}
        ref={scrollContainer.ref}
        className={`grid-set1 ${circle && "circle"} ${
          extraWide && "extraWide"
        }`}
      >
        {data.map((item, key) => (
          <div className="grid-card-wrapper" key={key}>
            <div
              className="grid-card"
              style={{
                backgroundImage: "url(" + item.squareImage + ")",
                borderRadius: circle ? "500px" : "7px",
              }}
              onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
            >
              <div className="titleHolder">
                <div className="title">{item.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

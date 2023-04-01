"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./CardSetTypeCircle.scss";

export default function CardSetTypeCircle({
  title,
  data = [],
  call = () => {},
  id = "id_" + Date.now() + Math.random(),
  sectionName = "",
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
          <div onClick={() => router.push(`/section/${sectionName}`)}>
            See More
          </div>
        </div>
      </div>
      <div id={id} ref={scrollContainer.ref} className="card-list">
        {data.map(
          (item, key) =>
            item.circleImage && (
              <div key={key}>
                <div
                  className="CardSetTypeA-card content-card"
                  style={{ backgroundImage: "url(" + item.circleImage + ")" }}
                  onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
                >
                  <div className="card-info">{item.name}</div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

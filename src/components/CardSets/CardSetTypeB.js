"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./CardSetTypeB.scss";

export default function CardSetTypeB({
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
    <div className="content CardSetTypeB vertical">
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

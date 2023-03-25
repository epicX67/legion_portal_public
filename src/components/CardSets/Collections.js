"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./Collections.scss";

export default function Collections({
  title,
  data = [],
  call = () => {},
  id = "id_" + Date.now() + Math.random(),
}) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (name) => {
    router.push(`/collection/${name}`);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="collections">
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
      <div id={id} ref={scrollContainer.ref} className="card-list">
        {data.map((item, key) => (
          <div key={key} className="collection-card">
            <div
              className="cover"
              style={{ backgroundImage: "url(" + item.bg + ")" }}
            ></div>

            <div className="title">{item.name}</div>
            <button onClick={() => handleItemClick(item.name)}>
              <i className="ri-play-fill"></i> See collection
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

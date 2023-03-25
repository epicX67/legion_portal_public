"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./Collections.scss";

export default function Collections({ title, data = [], call = () => {} }) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (name) => {
    router.push(`/collection/${name}`);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="collections">
      <p>{title}</p>
      <div ref={scrollContainer.ref} className="card-list">
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

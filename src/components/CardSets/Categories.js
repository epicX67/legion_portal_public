"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./Categories.scss";

export default function Categories({ title, data = [] }) {
  const scrollContainer = useScrollContainer();
  const router = useRouter();

  const handleItemClick = (url) => () => {
    router.push(url);
  };

  return (
    <div className="CardSetTypeA category">
      <p>{title}</p>
      <div className="card-list" ref={scrollContainer.ref}>
        {data.map((item, key) => (
          <div
            key={key}
            className="content-card-btn"
            onClick={handleItemClick(`/category/${item.title}`)}
          >
            <div className="card-info">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

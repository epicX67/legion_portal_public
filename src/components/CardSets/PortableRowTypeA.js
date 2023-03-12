"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./PortableRowTypeA.scss";

export default function PortableRowTypeA({
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
    <div className="portableRow">
      <div className="header">
        <i className="ri-award-fill"></i>
        <div className="title">{title}</div>
      </div>
      <div className="scrollWrapper">
        <div className="card-list" ref={scrollContainer.ref}>
          {data.map((item, key) => (
            <div className="card">
              <div
                key={key}
                className="cover"
                style={{ backgroundImage: "url(" + item.squareImage + ")" }}
              ></div>
              <div className="bCont">
                <div className="title">{item.name}</div>
                <div className="info">The Online Pool Game</div>
                <div
                  className="playBtn"
                  onClick={handleItemClick(key, `/game/${item.name}`)}
                >
                  Play
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

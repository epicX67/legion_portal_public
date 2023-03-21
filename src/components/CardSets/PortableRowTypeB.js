"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import "./PortableRowTypeB.scss";

export default function PortableRowTypeB({
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
    <div className="portableRowTypeB">
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
                <div
                  className="title"
                  onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
                >
                  {item.name}
                </div>
                <div className="info">The Online Pool Game</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useScrollContainer } from "react-indiana-drag-scroll";
import { useRouter } from "next/navigation";
import { flags } from "@/res/data";
import "./CardSetTypeA.scss";
import VideoCont from "./VideoCont";

export default function CardSetTypeA({
  title,
  data = [],
  call = () => {},
  id = "id_" + Date.now(),
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
    <div className="CardSetTypeA">
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
            item.wideImage && (
              <div key={key}>
                <div
                  className="CardSetTypeA-card"
                  onClick={handleItemClick(`/game/${item.name.toLowerCase()}`)}
                >
                  <div className="bgCont">
                    <VideoCont
                      enabled={item.name === "Plundur.io"}
                      url={
                        item.name === "Plundur.io"
                          ? "https://cdn.discordapp.com/attachments/1097110860297674752/1097135664757219388/giphy.mp4"
                          : ""
                      }
                    />
                    <div
                      style={{ backgroundImage: "url(" + item.wideImage + ")" }}
                      className="imageCont"
                    ></div>
                  </div>

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

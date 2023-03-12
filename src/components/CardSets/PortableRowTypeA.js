import React from "react";
import { useNavigate } from "react-router-dom";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { easingFunctions } from "../utils/easingFunctions";
import { scrollBehavior } from "../utils/scrollBehavior";
import useDrag from "../utils/useDrag";
import "./PortableRowTypeA.scss";

export default function PortableRowTypeA({
  title,
  data = [],
  call = () => {},
}) {
  const navigate = useNavigate();
  const [duration, setDuration] = React.useState(500);
  const [ease, setEase] = React.useState("noEasing");
  const [customAnimation, setCustomAnimation] = React.useState(false);

  function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;
    if (isThouchpad) {
      ev.stopPropagation();
      return;
    }
    if (ev.deltaY < 0) {
      // NOTE: for transitions
      apiObj.scrollNext(undefined, undefined, undefined, { duration });
    } else if (ev.deltaY > 0) {
      apiObj.scrollPrev(undefined, undefined, undefined, { duration });
    }
  }

  const { dragStart, dragStop, dragMove, dragging } = useDrag();
  const handleDrag =
    ({ scrollContainer }) =>
    (ev) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState("");
  const handleItemClick = (itemId, url) => () => {
    if (dragging) {
      return false;
    }
    setSelected(selected !== itemId ? itemId : "");
    navigate(url);
    // Any required functions for specific page
    call();
  };

  return (
    <div className="portableRow typeA">
      <div className="header">
        <i className="ri-award-fill"></i>
        <div className="title">{title}</div>
      </div>
      <div className="scrollWrapper">
        <ScrollMenu
          scrollContainerClassName="card-list"
          LeftArrow={null}
          RightArrow={null}
          onWheel={onWheel}
          onMouseDown={() => dragStart}
          onMouseUp={() => dragStop}
          onMouseMove={handleDrag}
          transitionDuration={duration} // NOTE: for transitions
          transitionEase={easingFunctions[ease]}
          transitionBehavior={customAnimation ? scrollBehavior : undefined}
        >
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
        </ScrollMenu>
      </div>
    </div>
  );
}

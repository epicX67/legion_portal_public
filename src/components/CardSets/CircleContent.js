import React from "react";
import { useNavigate } from "react-router-dom";
import "./CircleContent.scss";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { easingFunctions } from "../utils/easingFunctions";
import { scrollBehavior } from "../utils/scrollBehavior";
import useDrag from "../utils/useDrag";

export default function CircleContent({ title, data = [], call = () => {} }) {
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
    <div className="content circle">
      <p>{title}</p>
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
        {data.map(
          (item, key) =>
            item.circleImage && (
              <div
                key={key}
                className="content-card"
                style={{ backgroundImage: "url(" + item.circleImage + ")" }}
                onClick={handleItemClick(key, `/game/${item.name}`)}
              >
                <div className="card-info">{item.name}</div>
              </div>
            )
        )}
      </ScrollMenu>
    </div>
  );
}

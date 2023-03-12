import React from "react";
import { useNavigate } from "react-router-dom";
import "./WideContent.scss";

import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { easingFunctions } from "../utils/easingFunctions";
import { scrollBehavior } from "../utils/scrollBehavior";
import useDrag from "../utils/useDrag";
import featured from "../res/flags/featured.png";
import mostPlayed from "../res/flags/mostPlayed.png";
import newFlag from "../res/flags/new.png";
import topRated from "../res/flags/topRated.png";
import trending from "../res/flags/trending.png";
import updated from "../res/flags/updated.png";

const flags = {
  Featured: featured,
  "Most played": mostPlayed,
  Trending: trending,
  "Top rated": topRated,
  New: newFlag,
  Updated: updated,
};

export default function WideContent({ title, data = [], call = () => {} }) {
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
    <div className="content wide">
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
            item.wideImage && (
              <div
                key={key}
                className="content-card"
                style={{ backgroundImage: "url(" + item.wideImage + ")" }}
                onClick={handleItemClick(key, `/game/${item.name}`)}
              >
                {Object.keys(flags).includes(item.flag) && (
                  <img src={flags[item.flag]} alt="trending" />
                )}

                <div className="card-info">{item.name}</div>
              </div>
            )
        )}
      </ScrollMenu>
    </div>
  );
}

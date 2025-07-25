import { useEffect } from "react";

export default function useHorizontalDrag(id) {
  useEffect(() => {
    const slider = document.querySelector(`#${id}`);
    let mouseDown = false;
    let startX, scrollLeft;

    let startDragging = function (e) {
      mouseDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };
    let stopDragging = function (event) {
      mouseDown = false;
    };

    slider.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!mouseDown) {
        return;
      }
      const x = e.pageX - slider.offsetLeft;
      const scroll = x - startX;
      slider.scrollLeft = scrollLeft - scroll;
    });

    // Add the event listeners
    slider.addEventListener("mousedown", startDragging, false);
    slider.addEventListener("mouseup", stopDragging, false);
    slider.addEventListener("mouseleave", stopDragging, false);

    const forReturn = () => {
      slider.removeEventListener("mousemove", () => {});
      slider.removeEventListener("mousedown", () => {});
      slider.removeEventListener("mouseup", () => {});
      slider.removeEventListener("mouseleave", () => {});
    };

    return forReturn();
  }, []);
}

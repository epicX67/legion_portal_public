import React, { useState } from "react";
const url =
  "https://v.poki.com/2043a94c-1d69-4aff-a740-4e1510b1b4d0/thumbnail.3x3.vp9.mp4";

export default function VideoCont() {
  const [show, setShow] = useState(false);
  return (
    <div
      className="videoCont"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {show && <video loop preload="none" autoPlay muted src={url}></video>}
    </div>
  );
}

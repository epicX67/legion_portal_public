import React, { useState } from "react";

export default function VideoCont({
  enabled = false,
  url = "https://v.poki.com/2043a94c-1d69-4aff-a740-4e1510b1b4d0/thumbnail.3x3.vp9.mp4",
}) {
  const [show, setShow] = useState(false);
  if (!enabled) return null;
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

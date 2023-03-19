"use client";

export default function HeroVideo({ url, show }) {
  return (
    <div className="videoCont">
      {show && <video loop preload="none" autoPlay muted src={url}></video>}
    </div>
  );
}

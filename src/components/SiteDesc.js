import React, { useState } from "react";
import "./SiteDesc.scss";

export default function SiteDesc() {
  const [expand, setExpand] = useState(false);
  return (
    <div className="siteDesc">
      <h1>Thousands of games within a click</h1>
      <h2>
        LEGiON Portal is proud to provide millions of people with the ultimate
        service to play and enjoy the newest, best, craziest, and most addictive
        games.
      </h2>
      <h2>
        Some of our most played games are Plundur.io, CrazyRun.io and
        SnowBlast.io
      </h2>
      {expand ? (
        <>
          <h2>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </h2>
          <button onClick={() => setExpand(!expand)}>Show Less</button>
        </>
      ) : (
        <button onClick={() => setExpand(!expand)}>Show More</button>
      )}
    </div>
  );
}

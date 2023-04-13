"use client";
import { useEffect, useState } from "react";
import "./Footer.scss";
import { usePathname } from "next/navigation";

export default function Footer() {
  const [hide, setHide] = useState(true);
  const [disable, setDisable] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes("/game")) {
      setHide(true);
      setTimeout(() => {
        setHide(false);
      }, 3000);
    } else {
      setHide(false);
    }
  }, [pathName]);

  useEffect(() => {
    if (pathName.includes("/shorts")) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [pathName]);

  return (
    !hide &&
    !disable && (
      <footer>
        <div className="logo">
          <img
            className={`logo`}
            src={
              "https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
            }
            alt=""
          />
          <div className={`logo-name`}>LEGiON Portal</div>
        </div>
        <div className="footer-links">
          <div>About</div>
          <div>Developers</div>
          <div>Kids Edition</div>
          <div>Terms</div>
          <div>FAQ</div>
          <div>Contact</div>
        </div>
        <div className="version">
          <div className="type">ALPHA</div>
          <div className="no">v 0.14.0423</div>
        </div>
      </footer>
    )
  );
}

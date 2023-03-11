"use client";
import React, { useEffect, useState } from "react";
import "./ThemeSelector.scss";

const modes = [
  {
    name: "default",
  },
  {
    name: "dark-green",
  },
  {
    name: "deepblue",
  },
  {
    name: "white",
  },
  {
    name: "white-2",
  },
  {
    name: "pinky",
  },
];

export default function ThemeSelector({ show, toggle, isEmbed }) {
  const [mode, setMode] = useState("default");

  const setDefault = () => {
    setMode(modes[0].name);
    localStorage.setItem("theme", modes[0].name);
    document.documentElement.setAttribute("data-theme", "default");
  };

  useEffect(() => {
    let mode = localStorage.getItem("theme");
    if (!mode) {
      setDefault();
    } else {
      let mExists = modes.find((item) => item.name === mode);
      if (!mExists) setDefault();
      else applyMode(mode);
    }
  }, []);

  const applyMode = (newMode) => {
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.documentElement.setAttribute("data-theme", newMode);
  };

  if (isEmbed) return null;

  return (
    show && (
      <div className="mode-cont">
        <div className="mode-modal">
          <div className="title">Theme</div>
          <div className="mode-list">
            {modes.map((item, key) => (
              <div
                key={key}
                onClick={() => applyMode(item.name)}
                className={`mode ${item.name} ${
                  item.name === mode && "active"
                }`}
              >
                <i
                  className={`ri-check-double-line ${
                    item.name === mode && "active"
                  }`}
                ></i>
              </div>
            ))}
          </div>
          <div className="bottom-bar">
            <button onClick={() => toggle(!show)}>Close</button>
          </div>
        </div>
      </div>
    )
  );
}

import React, { useState } from "react";
import mainBg from "./assets/main.png";
import main2 from "./assets/wetransfer_main2-png_2025-12-14_0516/main2.png";
import main3 from "./assets/wetransfer_main2-png_2025-12-14_0516/main3.png";
import PlayButton from "./components/PlayButton";
import SettingsButton from "./components/SettingsButton";

type MenuProps = {
  username?: string | null;
  onLogout: () => void;
};

export default function Menu({ username, onLogout }: MenuProps) {
  const [hover, setHover] = useState<"none" | "left" | "right">("none");
  const currentBg =
    hover === "left" ? main2 : hover === "right" ? main3 : mainBg;
  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${currentBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };

  const centerColumn: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 80,
    transform: "translate(300px, 120px)",
  };

  const buttonRow: React.CSSProperties = {
    display: "flex",
    gap: 48,
    alignItems: "center",
    justifyContent: "center",
  };

  const smallLogout: React.CSSProperties = {
    marginTop: 8,
    background: "transparent",
    border: "none",
    color: "#fff",
    textDecoration: "underline",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <button
        aria-label="Logout"
        onClick={() => {
          const returnPath = localStorage.getItem("preAuthPath") || "/";
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          onLogout();
          window.location.href = returnPath;
        }}
        style={{
          position: "absolute",
          top: 24,
          right: 12,
          width: 160,
          height: 96,
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          opacity: 0,
          zIndex: 50,
        }}
      />
      <div style={centerColumn}>
        <div style={buttonRow}>
          <PlayButton
            onClick={() => {
              window.location.href = "/therapist";
            }}
            onMouseEnter={() => setHover("left")}
            onMouseLeave={() => setHover("none")}
          />
          <SettingsButton
            onClick={() => {
              window.location.href = "/src/game3.html";
            }}
            onMouseEnter={() => setHover("right")}
            onMouseLeave={() => setHover("none")}
            style={{ marginLeft: 70 }}
          />
        </div>
        <button style={smallLogout} onClick={onLogout}>
          Log out
        </button>
      </div>
    </div>
  );
}

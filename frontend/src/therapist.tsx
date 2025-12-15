import React from "react";
import bg from "./assets/wetransfer_untitled-transfer_2025-12-14_0540/chatbox2.png";

export default function Therapist() {
  const container: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    position: "relative",
  };

  const iframeStyle: React.CSSProperties = {
    width: "96vmin",
    height: "75vmin",
    border: "none",
    borderRadius: 12,
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    background: "transparent",
    transform: "translateY(60px)",
  };

  return (
    <div style={container}>
      <button
        aria-label="Logout"
        onClick={() => {
          const returnPath = localStorage.getItem("preAuthPath") || "/";
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          window.location.href = returnPath;
        }}
        style={{
          position: "absolute",
          top: 220,
          right: 12,
          width: 160,
          height: 64,
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          opacity: 0,
          zIndex: 50,
        }}
      />
      <button
        aria-label="Go to menu"
        onClick={() => {
          window.location.href = "/";
        }}
        style={{
          position: "absolute",
          top: 24,
          right: 12,
          width: 160,
          height: 160,
          background: "transparent",
          border: "none",
          padding: 0,
          margin: 0,
          cursor: "pointer",
          opacity: 0,
          zIndex: 50,
        }}
      />
      <iframe
        title="chatbox"
        src="/src/chatbox%20(1).html"
        style={iframeStyle}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}

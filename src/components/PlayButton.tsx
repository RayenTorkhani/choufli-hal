import React from "react";

type Props = {
  onClick?: () => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
};

const defaultStyle: React.CSSProperties = {
  padding: "84px 140px",
  fontSize: 48,
  minWidth: 250,
  minHeight: 500,
  borderRadius: 24,
  border: "none",
  cursor: "pointer",
  boxShadow: "none",
  background: "transparent",
  color: "transparent",
};

export default function PlayButton({
  onClick,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  return (
    <button
      style={{ ...defaultStyle, ...style }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={typeof children === "string" ? children : "Play"}
    >
      {children ?? null}
    </button>
  );
}

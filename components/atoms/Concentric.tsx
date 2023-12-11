import React from "react";

interface CircleProps {
  size: number;
  opacity: number;
}

const Circle = ({ size, opacity }: CircleProps) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "-20%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        border: "2px solid rgba(78, 128, 255, 0.163)",
        opacity: opacity,
        zIndex: "-1000",
      }}
    />
  );
};

export default Circle;

"use client";
import * as React from "react";
import { inBounds } from "../core/math-utils";
import CanvasStore from "../state/CanvasStore";

export interface CanvasPositionProps {
  top: number;
  left: number;
  width: number;
  height: number;
  children?: React.ReactNode;
}

export const CanvasPosition = ({
  left,
  top,
  width,
  height,
  children,
}: CanvasPositionProps) => {
  const screen = CanvasStore.screen;
  if (
    inBounds(
      { left, top, height, width },
      {
        left: screen.x,
        top: screen.y,
        width: screen.width,
        height: screen.height,
      },
    )
  ) {
    return (
      <div
        draggable={false}
        style={{
          position: "absolute",
          left: `${left - screen.x}px`,
          top: `${top - screen.y}px`,
          display: "inline-block",
        }}
      >
        {children}
      </div>
    );
  } else return null;
};

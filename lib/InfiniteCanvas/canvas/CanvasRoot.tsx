"use client"
import useSize from "@react-hook/size";
import * as React from "react";
import { useEffect, useRef } from "react";
import CanvasStore from "../state/CanvasStore";
import InfiniteCanvas from "./InfiniteCanvas";

const wheelListener = (e: globalThis.WheelEvent) => {
  const friction = 1;
  const event = e as globalThis.WheelEvent;
  const deltaX = event.deltaX * friction;
  const deltaY = event.deltaY * friction;

  if (event.ctrlKey || event.metaKey) {
    // CanvasStore.zoomCamera(deltaX, deltaY);
  } else {
    CanvasStore.moveCamera(deltaX, deltaY);
  }
  event.stopPropagation();
  event.preventDefault();
};

const pointerListener = (e: globalThis.PointerEvent) => {
  CanvasStore.movePointer(e.clientX, e.clientY);
  e.stopPropagation();
  e.preventDefault();
};

interface CanvasRootProps {
  children: React.ReactNode;
}

const CanvasRoot: React.FC<CanvasRootProps> = ({ children }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [width, height] = useSize(canvasRef);

  const handleMouseEnter = () => {
    document.documentElement.classList.add("disable-overscroll");
    document.body.classList.add("disable-overscroll");
  };

  const handleMouseLeave = () => {
    document.documentElement.classList.remove("disable-overscroll");
    document.body.classList.remove("disable-overscroll");
  };

  useEffect(() => {
    if (width === 0 || height === 0) return;
    CanvasStore.initialize(width, height);
  }, [width, height]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.addEventListener("wheel", wheelListener, { passive: false });
      canvas.addEventListener("pointermove", pointerListener, {
        passive: false,
      });

      return () => {
        canvas.removeEventListener("wheel", wheelListener);
        canvas.removeEventListener("pointermove", pointerListener);
      };
    }
  }, []);

  const screen = CanvasStore.screen;
  return (
    <div
      className="w-full h-full overscroll-none"
      ref={canvasRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <InfiniteCanvas>{children}</InfiniteCanvas>
    </div>
  );
};

export default CanvasRoot;

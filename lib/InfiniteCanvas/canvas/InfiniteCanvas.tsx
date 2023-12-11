import * as React from "react";
import { memo } from "react";
import CanvasStore from "../state/CanvasStore";

const InfiniteCanvas = ({ children }: { children: React.ReactNode }) => {
  const scale = CanvasStore.scale;

  return (
    <div
      className="w-full h-full relative bg-transparent"
      style={{
        transform: `scale(${(scale.x, scale.y)})`,
        transformOrigin: "center center",
      }}
    >
      {children}
    </div>
  );
};

export default memo(InfiniteCanvas);

import {
  CanvasPosition,
  CanvasPositionProps,
} from "@/lib/InfiniteCanvas/canvas/CanvasPosition";

export interface BoxProps {
  id: string;
  initialPos: { left: number; top: number };
  connect: boolean;
}

interface MusicBoxSeedProps extends CanvasPositionProps {
  imageSrc: string;
  width: number;
  height: number;
}

const MusicBoxSeed = ({
  imageSrc,
  left,
  top,
  width,
  height,
}: MusicBoxSeedProps) => {
  return (
    <CanvasPosition left={left} top={top} width={width} height={height}>
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: "130px",
            height: "130px",
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxSizing: "border-box",
            border: "40px solid black",
            clipPath:
              'path("M65.005 0C29.107 0 0 29.094 0 64.992c0 35.899 29.107 65.005 65.005 65.005 35.899 0 64.992-29.106 64.992-65.005C129.997 29.094 100.904 0 65.005 0Zm0 63.234a1.772 1.772 0 1 1 0 3.543 1.772 1.772 0 0 1 0-3.543Z")',
          }}
        >
          <div
            className="rounded-full bg-white"
            style={{
              backgroundColor: "",
              border: "2px solid gray",
            }}
          />
        </div>
      </div>
    </CanvasPosition>
  );
};

export default MusicBoxSeed;

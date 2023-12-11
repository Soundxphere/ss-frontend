"use client";
import dynamic from "next/dynamic";

import MusicBoxSeed, { BoxProps } from "@/components/molecules/MusicBoxSeed";
import DiscographyPanels from "@/components/organisms/DiscographyPanels";
import useRenderLoop from "@/lib/InfiniteCanvas/core/RenderLoop";
import CanvasStore from "@/lib/InfiniteCanvas/state/CanvasStore";

const CanvasRoot = dynamic(
  () => import("@/lib/InfiniteCanvas/canvas/CanvasRoot"),
  { ssr: false },
);

const images = [
  "https://picsum.photos/id/237/400/400",
  "https://picsum.photos/id/238/400/400",
  "https://picsum.photos/id/239/400/400",
  "https://picsum.photos/id/240/400/400",
  "https://picsum.photos/id/241/400/400",
  "https://picsum.photos/id/242/400/400",
  "https://picsum.photos/id/243/400/400",
  "https://picsum.photos/id/244/400/400",
  "https://picsum.photos/id/245/400/400",
  "https://picsum.photos/id/246/400/400",
  "https://picsum.photos/id/247/400/400",
];

interface MusicBox {
  id: string;
  connect: boolean;
}

const rawBoxes = [
  [{ id: "box1", connect: true }],
  [
    { id: "box2", connect: false },
    { id: "box3", connect: false },
    { id: "box4", connect: true },
    { id: "box5", connect: false },
  ],
  [
    { id: "box6", connect: false },
    { id: "box7", connect: false },
    { id: "box8", connect: true },
  ],
  [{ id: "box9", connect: true }],
];

export default function DiscographyPage() {
  useRenderLoop(120);

  const generateBoxes = (boxes: MusicBox[][]): BoxProps[] => {
    return boxes.flatMap((column, columnIndex) => {
      const middleIndex = (column.length - 1) / 2;
      return column.map((box, rowIndex) => ({
        id: box.id,
        initialPos: {
          left: columnIndex * 300 + 350,
          top: (rowIndex - middleIndex) * 160 + 300,
        },
        connect: box.connect,
      }));
    });
  };

  const boxes = generateBoxes(rawBoxes);

  const positions: {
    [id: string]: { left: number; top: number };
  } = boxes.reduce((acc, box) => ({ ...acc, [box.id]: box.initialPos }), {});

  const pathD = () => {
    const boxWidth = 140;
    const boxHeight = 140;
    const steepness = 0; // Adjust this value to change the steepness of the curve
    const curveStart = 0.7; // Adjust this value to change the starting point of the curve (0 = start, 1 = end)
    return boxes
      .filter((box) => box.connect)
      .map((box, i, arr) => {
        if (i === 0) {
          // For the first box, start the line from the middle of the right side
          return `M${
            positions[box.id].left - CanvasStore.screen.x + boxWidth / 2
          },${positions[box.id].top - CanvasStore.screen.y + boxHeight / 2}`;
        } else {
          const prevBox = arr[i - 1];
          // Start point: middle of the right side of the previous box
          const startX =
            positions[prevBox.id].left - CanvasStore.screen.x + boxWidth;
          const startY =
            positions[prevBox.id].top - CanvasStore.screen.y + boxHeight / 2;
          // End point: middle of the left side of the current box
          const endX = positions[box.id].left - CanvasStore.screen.x;
          const endY =
            positions[box.id].top - CanvasStore.screen.y + boxHeight / 2;
          // Control points for the cubic Bezier curve
          const controlPoint1X = startX + curveStart * (endX - startX);
          const controlPoint1Y = startY - steepness;
          const controlPoint2X = startX + (1 - curveStart) * (endX - startX);
          const controlPoint2Y = endY + steepness;

          return `M${startX},${startY} C${controlPoint1X},${controlPoint1Y} ${controlPoint2X},${controlPoint2Y} ${endX},${endY}`;
        }
      })
      .join(" ");
  };

  return (
    <div className="h-[80vh] w-full overflow-hidden rounded-3xl bg-transparent">
      <CanvasRoot>
        <DiscographyPanels />
        <div className="absolute inset-0 bg-[#13121D] bg-[url(/grid--dark.svg)]"></div>

        <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
          <path
            d={pathD()}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="4"
            fill="transparent"
            strokeLinecap="round"
          />
        </svg>

        {boxes.map((box, index) => (
          <MusicBoxSeed
            key={box.id}
            width={140}
            height={140}
            top={box.initialPos.top}
            left={box.initialPos.left}
            imageSrc={images[index]}
          />
        ))}
      </CanvasRoot>
    </div>
  );
}

import { colorToCss } from "@/lib/utils";
import { Rectanglelayer } from "@/types/canvas";

interface RectangleProps {
    id: string;
    layer: Rectanglelayer;
    onPointerDown: (e: React.PointerEvent, id:string) => void;
    selectioncolor?: string
};

export const Rectangle = ({id,layer,onPointerDown,selectioncolor}: RectangleProps) => {
    const { x, y, width, height, fill } = layer;

    return (
        <rect className="drop-shadow-md" onPointerDown={(e) => onPointerDown(e,id)} style={{
            transform: `translate(${x}px, ${y}px)`,
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fill={fill ? colorToCss(fill) : "#000"}
        stroke={selectioncolor || "Transparent"}
        />
    );
};
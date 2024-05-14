import { Kalam } from "next/font/google";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import { cn,colorToCss, getContrastTextColor } from "@/lib/utils";
import { Notelayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
});

const calcFontSize = (width: number, height:number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.15;
    const fontSizeHeight = height * scaleFactor;
    const fontSizeWidth = width * scaleFactor;

    return Math.min(fontSizeHeight,fontSizeWidth,maxFontSize);
};

interface NoteProps {
    id: string;
    layer: Notelayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Note = ({id,layer,onPointerDown,selectionColor}: NoteProps) => {

    const {x,y,width,height,fill, value} = layer;

    const updateValue = useMutation(({storage}, newValue: string) => {
        const livelayers = storage.get("layers");
        livelayers.get(id)?.set("value",newValue);
    }, []);

    const handleContentChange = (e: ContentEditableEvent) => {
        updateValue(e.target.value);
    };

    return (
        <foreignObject x={x} y={y} height={height} width={width} onPointerDown={(e) => onPointerDown(e,id)} style={{
            outline: selectionColor ? `1px solid ${selectionColor}` : "none",
            backgroundColor: fill ? colorToCss(fill) : "#000",
        }} className="shadow-md drop-shadow-xl">
            <ContentEditable html={value || "Text"} onChange={handleContentChange} className={cn(
                "h-full w-full flex items-center justify-center text-center outline-none",
                font.className
            )} style={{
                color: fill ? getContrastTextColor(fill) : "#000",
                fontSize: calcFontSize(width,height),
            }}/>
        </foreignObject>
    );
};
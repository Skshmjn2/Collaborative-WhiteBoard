import { Kalam } from "next/font/google";
import ContentEditable, {ContentEditableEvent} from "react-contenteditable";
import { cn,colorToCss } from "@/lib/utils";
import { Textlayer } from "@/types/canvas";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
    subsets: ["latin"],
    weight: ["400"]
});

const calcFontSize = (width: number, height:number) => {
    const maxFontSize = 96;
    const scaleFactor = 0.5;
    const fontSizeHeight = height * scaleFactor;
    const fontSizeWidth = width * scaleFactor;

    return Math.min(fontSizeHeight,fontSizeWidth,maxFontSize);
};

interface TextProps {
    id: string;
    layer: Textlayer;
    onPointerDown: (e: React.PointerEvent, id: string) => void;
    selectionColor?: string;
};

export const Text = ({id,layer,onPointerDown,selectionColor}: TextProps) => {

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
            outline: selectionColor ? `1px solid ${selectionColor}` : "none"
        }}>
            <ContentEditable html={value || "Text"} onChange={handleContentChange} className={cn(
                "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
                font.className
            )} style={{
                color: fill ? colorToCss(fill) : "#000",
                fontSize: calcFontSize(width,height),
            }}/>
        </foreignObject>
    );
};
"use client";

import { useStorage } from "@/liveblocks.config";
import { Layertype } from "@/types/canvas";
import { memo } from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellipse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

interface LayerPreviewProps {
    id: string;
    onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
    selectionColor?: string
};

export const LayerPreview = memo(({id,onLayerPointerDown,selectionColor}: LayerPreviewProps) => {
    const layer = useStorage((root) => root.layers.get(id));
    if(!layer){
        return null;
    };

    switch(layer.type){
        case Layertype.Path:
            return (
                <Path key={id} points={layer.points} onPointerDown={(e) => onLayerPointerDown(e,id)} 
                stroke={selectionColor} x={layer.x} y={layer.y} 
                fill={layer.fill ? colorToCss(layer.fill) : "#000"}/>
            );
        case Layertype.Note:
            return (
                <Note id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            );
        case Layertype.Text:
            return (
                <Text id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} />
            );
        case Layertype.Ellipse:
            return(
                <Ellipse id={id} layer={layer} onPointerDown={onLayerPointerDown} selectionColor={selectionColor} /> 
            );
        case Layertype.Rectangle:
            return (
                <Rectangle id={id} layer={layer} onPointerDown={onLayerPointerDown} selectioncolor={selectionColor}/>
            );
        default:
            console.warn("Unknown");
            return null;
    }

    return (
        <div>
        </div>
    );
});

LayerPreview.displayName = "LayerPreview";
export type Color = {
    r: number;
    g: number;
    b: number;
};

export type Camera = {
    x: number;
    y: number;
};

export enum Layertype {
    Rectangle,Ellipse, Path, Text, Note
};

export type Rectanglelayer = {
    type: Layertype.Rectangle;
    x: number;
    y: number;
    height: number;
    width: number;  
    fill: Color;
    value?: string;
};

export type Ellipselayer = {
    type: Layertype.Ellipse;
    x: number;
    y: number;
    height: number;
    width: number;  
    fill: Color;
    value?: string;
};

export type Pathlayer = {
    type: Layertype.Path;
    x: number;
    y: number;
    height: number;
    width: number;  
    fill: Color;
    points: number[][];
    value?: string;
};

export type Textlayer = {
    type: Layertype.Text;
    x: number;
    y: number;
    height: number;
    width: number;  
    fill: Color;
    value?: string;
};

export type Notelayer = {
    type: Layertype.Note;
    x: number;
    y: number;
    height: number;
    width: number;  
    fill: Color;
    value?: string;
};

export type Point = {
    x: number;
    y: number;
};

export type XYWH = {
    x: number;
    y: number;
    height: number;
    width: number;
}

export enum Side {
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
};

export enum CanvasMode {
    None,
    Pressing,
    SelectionNet,
    Translating,
    Inserting,
    Resizing,
    Pencil
};

export type CanvasState = 
 | {
    mode: CanvasMode.None;
 }
 | {
    mode: CanvasMode.Pressing;
    origin: Point;
 }
 | {
    mode: CanvasMode.SelectionNet;
    origin: Point;
    current?: Point;    
 }
 | {
    mode: CanvasMode.Translating;
    current: Point;
 }
 | {
    mode: CanvasMode.Inserting;
    layerType: Layertype.Ellipse | Layertype.Rectangle | Layertype.Text | Layertype.Note;
 }
 | {
    mode: CanvasMode.Resizing;
    initialBounds: XYWH;
    corner: Side;
 }
 | {
    mode: CanvasMode.Pencil;
 };

 export type Layer = Rectanglelayer | Ellipselayer | Textlayer | Pathlayer | Notelayer
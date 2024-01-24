export enum SHAPE_PRESETS {
  LINE = "LINE",
  ARROW = "ARROW",
  RECTANGLE = "RECTANGLE",
  ELLIPSE = "ELLIPSE",
  FREE_DRAW = "FREE_DRAW",
  TEXT = "TEXT",
  DIAMOND = "DIAMOND",
}

export enum ACTION_TYPES {
  IDLE = "IDLE",
  DRAWING = "DRAWING",
  INPUT = "INPUT",
}

export interface ElementOptions {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  previousElement?: any;
  text?: string;
  pressure?: number;
  elementOptions: Record<string, any>;
}

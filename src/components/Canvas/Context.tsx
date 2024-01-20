// libs
import { RefObject, createContext, useContext } from "react";

// types
import { SHAPE_PRESETS } from "./types";

// const [elements, setElements] = useState<Record<string, any>[]>([]);

interface ICanvasContext {
  selectedPreset: SHAPE_PRESETS;
  setPreset: (newPreset: SHAPE_PRESETS) => void;
  elements: Record<string, any>[];
  setElements: Record<string, any>;
  undoAction: VoidFunction;
  redoAction: VoidFunction;
  resetRedoAction: VoidFunction;
}

const CanvasContext = createContext<ICanvasContext>({
  selectedPreset: SHAPE_PRESETS.LINE,
  // @ts-ignore
  setPreset: () => {},
  elements: [],
  setElements: () => {},
  undoAction: () => {},
  redoAction: () => {},
  resetRedoAction: () => {},
});

export const useCanvasContext = () => useContext(CanvasContext);

export default CanvasContext;

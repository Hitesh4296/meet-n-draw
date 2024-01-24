// libs
import { RefObject, createContext, useContext } from "react";

// types
import { ACTION_TYPES, SHAPE_PRESETS } from "./types";

// const [elements, setElements] = useState<Record<string, any>[]>([]);

interface ICanvasContext {
  selectedPreset: SHAPE_PRESETS;
  setPreset: (newPreset: SHAPE_PRESETS) => void;
  elements: Record<string, any>[];
  setElements: Record<string, any>;
  undoAction: VoidFunction;
  redoAction: VoidFunction;
  resetRedoAction: VoidFunction;
  actionType: ACTION_TYPES;
  setActionType: (newActionType: ACTION_TYPES) => void;
  options: Record<string, any>;
  setOptions: (any) => void;
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
  actionType: ACTION_TYPES.IDLE,
  setActionType: () => {},
  options: {},
  setOptions: () => {},
});

export const useCanvasContext = () => useContext(CanvasContext);

export default CanvasContext;

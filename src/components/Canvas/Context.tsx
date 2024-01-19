// libs
import { RefObject, createContext, useContext } from "react";

// types
import { SHAPE_PRESETS } from "./types";

interface ICanvasContext {
  selectedPreset: SHAPE_PRESETS;
  setPreset: (newPreset: SHAPE_PRESETS) => {};
}

const CanvasContext = createContext<ICanvasContext>({
  selectedPreset: SHAPE_PRESETS.LINE,
  setPreset: () => {},
});

export const useCanvasContext = () => useContext(CanvasContext);

export default CanvasContext;

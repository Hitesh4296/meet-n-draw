// libs
import { memo, ReactNode, useState } from "react";

// components
import Canvas from "../Canvas";
import CanvasContext from "../Canvas/Context";

// types
import { SHAPE_PRESETS } from "../Canvas/types";

// styles
import Toolbar from "../Toolbar";

const Excalidraw = () => {
  const [elementType, setElementType] = useState(SHAPE_PRESETS.LINE);

  return (
    <CanvasContext.Provider
      value={{ selectedPreset: elementType, setPreset: setElementType }}
    >
      <Canvas />
      <Toolbar />
    </CanvasContext.Provider>
  );
};

export default memo(Excalidraw);

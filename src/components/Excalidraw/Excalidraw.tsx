// libs
import { memo, useCallback, useState } from "react";

// components
import Canvas from "../Canvas";
import CanvasContext from "../Canvas/Context";

// types
import { SHAPE_PRESETS } from "../Canvas/types";

// styles
import Toolbar from "../Toolbar";

const Excalidraw = () => {
  const [elementType, setElementType] = useState(SHAPE_PRESETS.LINE);
  const [elements, setElements] = useState<Record<string, any>[]>([]);
  const [redoElements, setRedoElements] = useState<Record<string, any>[]>([]);

  const undoAction = useCallback(() => {
    if (elements.length === 0) return;

    const existingElements = [...elements];

    const lastElement: Record<string, any> = existingElements.pop();

    setElements(existingElements);
    setRedoElements((prevState) => [...prevState, lastElement]);
  }, [elements]);

  const redoAction = useCallback(() => {
    if (redoElements.length === 0) return;
    const redoStack = [...redoElements];

    const lastElementFromRedo = redoStack.pop();

    setElements((prevState) => [...prevState, lastElementFromRedo]);
    setRedoElements(redoStack);
  }, [redoElements]);

  const resetRedoAction = () => {
    setRedoElements([]);
  };

  return (
    <CanvasContext.Provider
      value={{
        selectedPreset: elementType,
        setPreset: setElementType,
        elements,
        setElements,
        undoAction,
        redoAction,
        resetRedoAction,
      }}
    >
      <Canvas />
      <Toolbar />
    </CanvasContext.Provider>
  );
};

export default memo(Excalidraw);

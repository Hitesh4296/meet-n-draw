// libs
import { memo, useCallback, useState } from "react";

// components
import Canvas from "../Canvas";
import CanvasContext from "../Canvas/Context";

// types
import { ACTION_TYPES, SHAPE_PRESETS } from "../Canvas/types";

// styles
import Toolbar from "../Toolbar";
import OptionsSelector from "../OptionsSelector";
import { hideLastMatchingElement } from "@/utils/hideLastMatchingElement";
import { unhideLastMatchingElement } from "@/utils/unhideLastMatchingElement";

const Excalidraw = () => {
  const [elementType, setElementType] = useState(SHAPE_PRESETS.LINE);
  const [elements, setElements] = useState<Record<string, any>[]>([]);
  const [redoElements, setRedoElements] = useState<Record<string, any>[]>([]);
  const [actionType, setActionType] = useState<ACTION_TYPES>(ACTION_TYPES.IDLE);
  const [options, setOptions] = useState({x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    elementOptions: {},  fill: "#fff", stroke: "#000" });
  const [selectedIds, setSelectedIds] = useState([]);

  const undoAction = useCallback(() => {
    if (elements.length === 0) return;

    const existingElements = [...elements];

    const lastElement: Record<string, any> = existingElements.pop();

    setElements(unhideLastMatchingElement(existingElements, lastElement.id));
    setRedoElements((prevState) => [...prevState, lastElement]);
  }, [elements]);

  const redoAction = useCallback(() => {
    if (redoElements.length === 0) return;
    const redoStack = [...redoElements];

    const lastElementFromRedo = redoStack.pop();

    setElements((prevState) => [
      ...hideLastMatchingElement(prevState, lastElementFromRedo.id),
      lastElementFromRedo,
    ]);
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
        actionType,
        setActionType,
        options,
        setOptions,
        selectedIds,
        setSelectedIds,
      }}
    >
      <Canvas />
      <Toolbar />
      <OptionsSelector />
    </CanvasContext.Provider>
  );
};

export default memo(Excalidraw);

// libs
import {
  useEffect,
  memo,
  useLayoutEffect,
  useState,
  useRef,
  MouseEventHandler,
} from "react";

// styles
import { Canvas, TextInput } from "./Canvas.styles";

// context
import { useCanvasContext } from "./Context";
import { ACTION_TYPES, SHAPE_PRESETS } from "./types";
let elementID = 0;

// utils
import createElement from "./elementUtils/createElement";
import updateElement from "./elementUtils/updateElement";
import renderElements from "./elementUtils/renderElements";

const CanvasProvider = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    selectedPreset,
    elements,
    setElements,
    resetRedoAction,
    actionType,
    setActionType,
    options,
  } = useCanvasContext();

  const startDrawing: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (selectedPreset === SHAPE_PRESETS.TEXT) {
      setActionType(ACTION_TYPES.INPUT);
    } else {
      setActionType(ACTION_TYPES.DRAWING);
    }

    resetRedoAction();

    const { clientX, clientY } = event;

    const newElement = createElement(selectedPreset, elementID, {
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
    });

    setElements((prevState) => [...prevState, newElement]);
  };

  const trackPointer: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (actionType !== ACTION_TYPES.DRAWING) return;

    const { clientX, clientY } = event;

    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];

    const { x1, y1 } = lastElement;

    const updatedElement = updateElement(selectedPreset, elementID, {
      x1,
      y1,
      x2: clientX,
      y2: clientY,
      previousElement: lastElement,
      text: textAreaRef.current?.value || "",
    });
    const existingState = [...elements];

    existingState[lastIndex] = updatedElement;

    setElements(existingState);
  };

  const stopDrawing = () => {
    if (
      actionType === ACTION_TYPES.INPUT &&
      selectedPreset === SHAPE_PRESETS.TEXT
    )
      return;

    setActionType(ACTION_TYPES.IDLE);
    elementID++;
  };

  const textAreaChangeHandler = () => {
    if (selectedPreset !== SHAPE_PRESETS.TEXT) return;

    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];

    const { x1, y1 } = lastElement;

    const updatedElement = updateElement(selectedPreset, elementID, {
      x1,
      y1,
      x2: x1,
      y2: y1,
      previousElement: lastElement,
      text: textAreaRef.current?.value || "",
    });
    const existingState = [...elements];

    existingState[lastIndex] = updatedElement;

    setElements(existingState);
  };

  useLayoutEffect(() => {
    const canvas = ref.current;
    const canvasContext = canvas?.getContext("2d");

    if (canvas === null) {
      return;
    }

    canvasContext?.clearRect(
      0,
      0,
      canvas?.width || window.innerWidth,
      canvas?.height || window.innerHeight
    );
    setShowCanvas(true);

    renderElements(elements, canvas);
  }, [elements]);

  return (
    <>
      <Canvas
        ref={ref}
        id="my-canvas"
        width={showCanvas ? window.innerWidth : ""}
        height={showCanvas ? window.innerHeight : ""}
        onPointerDown={startDrawing}
        onPointerMove={trackPointer}
        onMouseUp={stopDrawing}
      ></Canvas>
      {actionType === ACTION_TYPES.INPUT && (
        <TextInput
          autoFocus={true}
          value={elements[elements.length - 1]?.text}
          ref={textAreaRef}
          style={{
            left: elements[elements.length - 1]?.x1 || 0,
            top: elements[elements.length - 1]?.y1 || 0,
            transform: "translate(-50%, -50%)",
          }}
          onChange={textAreaChangeHandler}
          onBlur={() => textAreaRef.current.focus()}
        />
      )}
    </>
  );
};

export default memo(CanvasProvider);

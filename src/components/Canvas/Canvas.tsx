// libs
import {
  ReactNode,
  memo,
  useLayoutEffect,
  useState,
  useRef,
  MouseEventHandler,
} from "react";
import rough from "roughjs";
import { getStroke } from "perfect-freehand";

// styles
import { Canvas } from "./Canvas.styles";

// context
import { useCanvasContext } from "./Context";
import { SHAPE_PRESETS } from "./types";
let elementID = 0;

// utils
import { getSvgPathFromStroke } from "./Canvas.utils";

const CanvasProvider = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<any>([]);

  const generator = rough.generator();

  const { selectedPreset } = useCanvasContext();

  const createElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    shapePresetIdentifier: SHAPE_PRESETS
  ) => {
    let element;
    let freeDrawPoints = [];

    if (shapePresetIdentifier === SHAPE_PRESETS.LINE) {
      element = generator.line(x1, y1, x2, y2);
    }

    if (shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE) {
      element = generator.rectangle(x1, y1, x2 - x1, y2 - y1);
    }

    if (shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE) {
      element = generator.ellipse(
        (x1 + x2) / 2,
        (y1 + y2) / 2,
        x2 - x1,
        y2 - y1
      );
    }

    if (shapePresetIdentifier === SHAPE_PRESETS.ARROW) {
      const line = generator.line(x1, y1, x2, y2);

      if (Math.abs(x2 - x1) > 5 || Math.abs(y2 - y1) > 5) {
        // Calculate the angle between the line and the x-axis
        const angle = Math.atan2(y2 - y1, x2 - x1);

        // Calculate coordinates for arrowhead
        const x3 = x2 - 20 * Math.cos(angle - Math.PI / 6);
        const y3 = y2 - 20 * Math.sin(angle - Math.PI / 6);

        const x4 = x2 - 20 * Math.cos(angle + Math.PI / 6);
        const y4 = y2 - 20 * Math.sin(angle + Math.PI / 6);

        const arrowL = generator.line(x2, y2, x3, y3);
        const arrowR = generator.line(x2, y2, x4, y4);

        element = [line, arrowL, arrowR];
      } else {
        element = [line];
      }
    }

    if (shapePresetIdentifier === SHAPE_PRESETS.FREE_DRAW) {
    }

    return {
      id,
      x1,
      y1,
      x2,
      y2,
      element,
      shapePresetIdentifier,
      freeDrawPoints,
    };
  };

  const updateElement = (
    id: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    shapePresetIdentifier: SHAPE_PRESETS,
    previousElement?: any
  ) => {
    if (
      shapePresetIdentifier === SHAPE_PRESETS.ARROW ||
      shapePresetIdentifier === SHAPE_PRESETS.LINE ||
      shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE ||
      shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE
    ) {
      return createElement(id, x1, y1, x2, y2, shapePresetIdentifier);
    }

    if (shapePresetIdentifier === SHAPE_PRESETS.FREE_DRAW) {
      if (previousElement === undefined) {
        return {
          id,
          x1,
          x2,
          y1,
          y2,
          shapePresetIdentifier,
          freeDrawPoints: [{ x: x1, y: y2 }],
        };
      }

      previousElement = {
        ...previousElement,
        freeDrawPoints: [...previousElement.freeDrawPoints, { x: x2, y: y2 }],
      };

      return previousElement;
    }
  };

  const startDrawing: MouseEventHandler<HTMLCanvasElement> = (event) => {
    setIsDrawing(true);

    const { clientX, clientY } = event;

    const newElement = updateElement(
      elementID,
      clientX,
      clientY,
      clientX,
      clientY,
      selectedPreset
    );

    setElements((prevState) => [...prevState, newElement]);
  };

  const trackPointer: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!isDrawing) return;

    const { clientX, clientY } = event;

    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];

    const { x1, y1 } = lastElement;

    const updatedElement = updateElement(
      elementID,
      x1,
      y1,
      clientX,
      clientY,
      selectedPreset,
      lastElement
    );
    const existingState = [...elements];

    existingState[lastIndex] = updatedElement;

    setElements(existingState);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    elementID++;
  };

  useLayoutEffect(() => {
    const canvas = ref.current;
    const canvasContext = canvas?.getContext("2d");
    canvasContext?.clearRect(
      0,
      0,
      canvas?.width || window.innerWidth,
      canvas?.height || window.innerHeight
    );
    setShowCanvas(true);

    const rc = rough.canvas(canvas);

    elements.forEach((el) => {
      if (
        el.shapePresetIdentifier === SHAPE_PRESETS.LINE ||
        el.shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE ||
        el.shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE
      ) {
        rc.draw(el.element);
      } else if (el.shapePresetIdentifier === SHAPE_PRESETS.ARROW) {
        el.element.map((it) => {
          rc.draw(it);
        });
      } else if (el.shapePresetIdentifier === SHAPE_PRESETS.FREE_DRAW) {
        canvasContext?.fill(
          new Path2D(getSvgPathFromStroke(getStroke(el.freeDrawPoints)))
        );
      }
    });
  }, [elements]);

  return (
    <Canvas
      ref={ref}
      id="my-canvas"
      width={showCanvas ? window.innerWidth : ""}
      height={showCanvas ? window.innerHeight : ""}
      onMouseDown={startDrawing}
      onMouseMove={trackPointer}
      onMouseUp={stopDrawing}
    ></Canvas>
  );
};

export default memo(CanvasProvider);

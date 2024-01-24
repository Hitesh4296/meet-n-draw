// libs
import rough from "roughjs";

// types
import { ElementOptions, SHAPE_PRESETS } from "../types";
import createElement from "./createElement";

const updateElement = (
  shapePresetIdentifier: SHAPE_PRESETS,
  id: number,
  { x1, x2, y1, y2, previousElement, text, elementOptions }: ElementOptions
) => {
  if (
    shapePresetIdentifier === SHAPE_PRESETS.ARROW ||
    shapePresetIdentifier === SHAPE_PRESETS.LINE ||
    shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE ||
    shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE ||
    shapePresetIdentifier === SHAPE_PRESETS.DIAMOND
  ) {
    return createElement(shapePresetIdentifier, id, {
      x1,
      y1,
      x2,
      y2,
      elementOptions,
    });
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
      color: elementOptions?.stroke,
    };

    return previousElement;
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.TEXT) {
    return {
      id,
      x1,
      y1,
      shapePresetIdentifier,
      text,
      color: elementOptions?.stroke,
    };
  }
};

export default updateElement;

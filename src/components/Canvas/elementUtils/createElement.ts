// libs
import rough from "roughjs";

// types
import { ElementOptions, SHAPE_PRESETS } from "../types";

const createElement = (
  shapePresetIdentifier: SHAPE_PRESETS,
  id: number,
  {
    x1,
    x2,
    y1,
    y2,
    pressure,
    text,
    elementOptions,
    previousElement,
  }: ElementOptions
) => {
  let element;
  let freeDrawPoints: Record<string, number>[] = [];

  const generator = rough.generator();

  if (shapePresetIdentifier === SHAPE_PRESETS.LINE) {
    element = generator.line(x1, y1, x2, y2, elementOptions);
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE) {
    element = generator.rectangle(x1, y1, x2 - x1, y2 - y1, elementOptions);
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.DIAMOND) {
    element = generator.polygon(
      [
        [(x1 + x2) / 2, y1],
        [x1, (y1 + y2) / 2],
        [(x1 + x2) / 2, y2],
        [x2, (y1 + y2) / 2],
      ],
      elementOptions
    );
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE) {
    element = generator.ellipse(
      (x1 + x2) / 2,
      (y1 + y2) / 2,
      x2 - x1,
      y2 - y1,
      elementOptions
    );
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.ARROW) {
    const line = generator.line(x1, y1, x2, y2, elementOptions);

    if (Math.abs(x2 - x1) > 5 || Math.abs(y2 - y1) > 5) {
      // Calculate the angle between the line and the x-axis
      const angle = Math.atan2(y2 - y1, x2 - x1);

      // Calculate coordinates for arrowhead
      const x3 = x2 - 20 * Math.cos(angle - Math.PI / 6);
      const y3 = y2 - 20 * Math.sin(angle - Math.PI / 6);

      const x4 = x2 - 20 * Math.cos(angle + Math.PI / 6);
      const y4 = y2 - 20 * Math.sin(angle + Math.PI / 6);

      const arrowL = generator.line(x2, y2, x3, y3, elementOptions);
      const arrowR = generator.line(x2, y2, x4, y4, elementOptions);

      element = [line, arrowL, arrowR];
    } else {
      element = [line];
    }
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.FREE_DRAW) {
    return {
      id,
      x1,
      y1,
      x2,
      y2,
      element,
      shapePresetIdentifier,
      freeDrawPoints: previousElement
        ? [...previousElement?.freeDrawPoints, { x: x2, y: y2 }]
        : [{ x: x2, y: y2 }],
      text: "",
      color: elementOptions?.stroke,
      isVisible: true,
    };
  }

  if (shapePresetIdentifier === SHAPE_PRESETS.TEXT) {
    return {
      id,
      x1,
      y1,
      element,
      shapePresetIdentifier,
      freeDrawPoints,
      text: text || "",
      color: elementOptions?.stroke,
      isVisible: true,
    };
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
    text: "",
    isVisible: true,
  };
};

export default createElement;

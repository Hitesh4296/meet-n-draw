import { RefObject } from "react";
import rough from "roughjs";
import { SHAPE_PRESETS } from "../types";
import { Drawable } from "roughjs/bin/core";
import { getSvgPathFromStroke } from "../Canvas.utils";
import { getStroke } from "perfect-freehand";

const renderElements = (elements: any[], canvas: HTMLCanvasElement) => {
  const rc = rough.canvas(canvas);
  const canvasContext = canvas?.getContext("2d");

  elements.forEach((el) => {
    if (
      el.shapePresetIdentifier === SHAPE_PRESETS.LINE ||
      el.shapePresetIdentifier === SHAPE_PRESETS.RECTANGLE ||
      el.shapePresetIdentifier === SHAPE_PRESETS.ELLIPSE ||
      el.shapePresetIdentifier === SHAPE_PRESETS.DIAMOND
    ) {
      rc.draw(el.element);
    } else if (el.shapePresetIdentifier === SHAPE_PRESETS.ARROW) {
      el.element.map((it: Drawable) => {
        rc.draw(it);
      });
    } else if (el.shapePresetIdentifier === SHAPE_PRESETS.FREE_DRAW) {
      canvasContext.fillStyle = el.color || "#000";
      canvasContext?.fill(
        new Path2D(
          getSvgPathFromStroke(
            getStroke(el.freeDrawPoints, {
              size: 16,
              thinning: 0.5,
              smoothing: 0.5,
              streamline: 0.5,
              easing: (t) => t,
              start: {
                taper: 0,
                easing: (t) => t,
                cap: true,
              },
              end: {
                taper: 100,
                easing: (t) => t,
                cap: true,
              },
            })
          )
        )
      );
    } else if (el.shapePresetIdentifier === SHAPE_PRESETS.TEXT) {
      canvasContext.font = "24px Arial";
      canvasContext.fillStyle = el.color || "#000w";
      canvasContext?.fillText(el.text, el.x1, el.y1);
    }
  });
};

export default renderElements;

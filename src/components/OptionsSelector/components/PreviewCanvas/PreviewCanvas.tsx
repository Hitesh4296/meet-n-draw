// libs
import { memo, useRef, useLayoutEffect, useMemo } from "react";

// defs
import { ElementOptions, SHAPE_PRESETS } from "@/components/Canvas/types";
interface PreviewCanvasProps {
  selectedPreset: SHAPE_PRESETS;
  options: ElementOptions;
}

// styles
import { Container, Canvas } from "./PreviewCanvas.styles";
import createElement from "@/utils/createElement";
import renderElements from "@/utils/renderElements";

const PreviewCanvas = ({ selectedPreset, options }: PreviewCanvasProps) => {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const PREVIEW_CONFIG = useMemo(() => {
    return {
      [SHAPE_PRESETS.LINE]: createElement(SHAPE_PRESETS.LINE, 0, {
        x1: 10,
        y1: 10,
        x2: 90,
        y2: 90,
        elementOptions: options,
      }),
      [SHAPE_PRESETS.ARROW]: createElement(SHAPE_PRESETS.ARROW, 0, {
        x1: 10,
        y1: 10,
        x2: 90,
        y2: 90,
        elementOptions: options,
      }),
      [SHAPE_PRESETS.RECTANGLE]: createElement(SHAPE_PRESETS.RECTANGLE, 0, {
        x1: 10,
        y1: 10,
        x2: 90,
        y2: 90,
        elementOptions: options,
      }),
      [SHAPE_PRESETS.DIAMOND]: createElement(SHAPE_PRESETS.DIAMOND, 0, {
        x1: 10,
        y1: 10,
        x2: 90,
        y2: 90,
        elementOptions: options,
      }),
      [SHAPE_PRESETS.ELLIPSE]: createElement(SHAPE_PRESETS.ELLIPSE, 0, {
        x1: 10,
        y1: 10,
        x2: 90,
        y2: 90,
        elementOptions: options,
      }),
      [SHAPE_PRESETS.FREE_DRAW]: createElement(SHAPE_PRESETS.FREE_DRAW, 0, {
        x1: 10,
        y1: 10,
        x2: 100,
        y2: 100,
        previousElement: {
          freeDrawPoints: [
            { x: 10, y: 40 },
            { x: 30, y: 0 },
            { x: 40, y: 80 },
            { x: 80, y: 90 },
            { x: 120, y: 40 },
            { x: 120, y: 20 },
          ],
        },
        elementOptions: options,
      }),
      [SHAPE_PRESETS.TEXT]: createElement(SHAPE_PRESETS.TEXT, 0, {
        x1: 15,
        y1: 50,
        x2: 10,
        y2: 10,
        text: "HEY!!!",
        elementOptions: options,
      }),
    };
  }, [options]);

  useLayoutEffect(() => {
    if (previewCanvasRef === null) {
      return;
    }
    const canvasContext = previewCanvasRef.current?.getContext("2d");

    canvasContext?.clearRect(
      0,
      0,
      previewCanvasRef.current?.width || window.innerWidth,
      previewCanvasRef.current?.height || window.innerHeight
    );

    renderElements([PREVIEW_CONFIG[selectedPreset]], previewCanvasRef.current);
  }, [options, selectedPreset, PREVIEW_CONFIG]);

  return (
    <Container>
      <Canvas ref={previewCanvasRef} width="100%" height="100%" />
    </Container>
  );
};

export default memo(PreviewCanvas);

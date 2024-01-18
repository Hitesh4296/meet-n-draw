// libs
import { memo } from "react";
import rough from "roughjs";

// styles
import { Toolbar as Container } from "./Toolbar.styles";
import { useCanvasContext } from "../Canvas/Context";

const Toolbar = () => {
  const { canvasRef } = useCanvasContext();

  const generator = rough.generator();

  if (!canvasRef?.current) {
    return;
  }

  const rc = rough.canvas(canvasRef?.current);

  const draw = () => {
    const rect = generator.rectangle(10, 10, 150, 100);

    rc.draw(rect);
  };

  return <Container onClick={draw}></Container>;
};

export default memo(Toolbar);

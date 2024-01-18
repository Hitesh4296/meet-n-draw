// libs
import {
  ReactNode,
  memo,
  useLayoutEffect,
  useState,
  useRef,
  MouseEventHandler,
  useEffect,
} from "react";
import { flushSync } from "react-dom";
import rough from "roughjs";

// context
import CanvasContext from "./Context";

// styles
import { Canvas } from "./Canvas.styles";

const CanvasProvider = ({
  children,
}: {
  children?: ReactNode | ReactNode[];
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [elements, setElements] = useState<any>([]);

  const generator = rough.generator();

  const createElement = (x1: number, y1: number, x2: number, y2: number) => {
    const element = generator.line(x1, y1, x2, y2);

    return { x1, y1, x2, y2, element };
  };

  const startDrawing: MouseEventHandler<HTMLCanvasElement> = (event) => {
    setIsDrawing(true);

    const { clientX, clientY } = event;

    const newElement = createElement(clientX, clientY, clientX, clientY);

    setElements((prevState) => [...prevState, newElement]);
  };

  const trackPointer: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!isDrawing) return;

    const { clientX, clientY } = event;

    const lastIndex = elements.length - 1;
    const lastElement = elements[lastIndex];

    const { x1, y1 } = lastElement;

    const updatedElement = createElement(x1, y1, clientX, clientY);
    const existingState = [...elements];

    existingState[lastIndex] = updatedElement;

    setElements(existingState);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  useLayoutEffect(() => {
    const canvas = ref.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    setShowCanvas(true);

    const rc = rough.canvas(canvas);

    elements.forEach((el) => {
      console.log();
      rc.draw(el.element);
    });
  }, [elements]);

  return (
    <CanvasContext.Provider value={{ canvasRef: ref }}>
      <Canvas
        ref={ref}
        id="my-canvas"
        width={showCanvas ? window.innerWidth : ""}
        height={showCanvas ? window.innerHeight : ""}
        onMouseDown={startDrawing}
        onMouseMove={trackPointer}
        onMouseUp={stopDrawing}
      ></Canvas>
      {children && children}
    </CanvasContext.Provider>
  );
};

export default memo(CanvasProvider);

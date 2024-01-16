// libs
import { ReactNode, memo, useLayoutEffect, useRef, useState } from "react";

// context
import CanvasContext from "./Context";

// styles
import { Canvas } from "./Canvas.styles";

const CanvasProvider = ({ children }: { children?: ReactNode }) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [showCanvas, setShowCanvas] = useState(false);

  useLayoutEffect(() => {
    setShowCanvas(true);
  }, []);

  return (
    <CanvasContext.Provider value={{ canvasRef: ref }}>
      {showCanvas && (
        <Canvas
          ref={ref}
          id="my-canvas"
          width={window.innerWidth}
          height={window.innerHeight}
        ></Canvas>
      )}
      {children && children}
    </CanvasContext.Provider>
  );
};

export default memo(CanvasProvider);

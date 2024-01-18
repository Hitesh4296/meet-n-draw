// libs
import { memo, ReactNode } from "react";
// components
import Canvas from "../Canvas";

// styles
import Toolbar from "../Toolbar";

const Excalidraw = ({ children }: { children?: ReactNode }) => {
  return (
    <Canvas>
      <Toolbar />
      {children && children}
    </Canvas>
  );
};

export default memo(Excalidraw);

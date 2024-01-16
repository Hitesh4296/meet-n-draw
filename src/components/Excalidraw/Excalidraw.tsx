// libs
import { memo, ReactNode } from "react";

// components
import Canvas from "../Canvas";

const Excalidraw = ({ children }: { children?: ReactNode }) => {
  return <Canvas>{children && children}</Canvas>;
};

export default memo(Excalidraw);

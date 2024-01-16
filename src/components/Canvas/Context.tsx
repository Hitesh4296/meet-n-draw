import { RefObject, createContext, useContext } from "react";

interface ICanvasContext {
  canvasRef: RefObject<HTMLCanvasElement> | null;
}

const CanvasContext = createContext<ICanvasContext>({ canvasRef: null });

export const useCanvasContext = () => useContext(CanvasContext);

export default CanvasContext;

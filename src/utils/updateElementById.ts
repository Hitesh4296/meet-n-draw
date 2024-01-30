import { ElementOptions } from "@/components/Canvas/types";
import createElement from "./createElement";

export const updateElementById = (
  elementId: number,
  elements: any[],
  options: ElementOptions
) => {
  const lastUpdatedElement = elements.findLast((el) => el.id === elementId);

  if (!lastUpdatedElement) return elements;

  const hideElementById = elements.map((el) => {
    if (el.id == elementId) {
      return { ...el, isVisible: false };
    }

    return el;
  });

  const newElement = createElement(
    lastUpdatedElement.shapePresetIdentifier,
    lastUpdatedElement.id,
    { ...lastUpdatedElement, elementOptions: options }
  );

  hideElementById.push(newElement);

  return hideElementById;
};

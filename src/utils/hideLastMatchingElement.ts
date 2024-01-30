export const hideLastMatchingElement = (elements: any[], elementId: number) => {
  const lastMatchingIndex = elements.findLastIndex((el) => el.id == elementId);

  const copiedElements = [...elements];
  if (lastMatchingIndex > -1) {
    copiedElements[lastMatchingIndex] = {
      ...copiedElements[lastMatchingIndex],
      isVisible: false,
    };
  }

  return copiedElements;
};

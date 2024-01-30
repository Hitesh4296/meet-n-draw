// libs
import { memo, useState } from "react";

// styles
import { Sidebar } from "./OptionsSelector.styles";
import ColorPalette from "./components/ColorPalette";
import OptionWrapper from "./components/OptionWrapper";
import { useCanvasContext } from "../Canvas/Context";
import PreviewCanvas from "./components/PreviewCanvas";
import { updateElementById } from "@/utils/updateElementById";

// components

const OptionsSelector = () => {
  const {
    setOptions,
    options,
    selectedPreset,
    selectedIds,
    elements,
    setElements,
  } = useCanvasContext();

  const updateOptions = (propertyName, property) => {
    setOptions((prevState) => {
      const newOptions = { ...prevState, [propertyName]: property };
      selectedIds.length > 0 &&
        selectedIds.map((id) =>
          setElements(updateElementById(id, elements, newOptions))
        );
      return newOptions;
    });
  };

  const TOOLS_CONFIG = [
    {
      title: "Stroke",
      component: ColorPalette,
      propertyName: "stroke",
      onChange: updateOptions,
      selectedProperty: options["stroke"],
    },
    {
      title: "Fill",
      component: ColorPalette,
      propertyName: "fill",
      onChange: updateOptions,
      selectedProperty: options["fill"],
    },
  ];

  return (
    <Sidebar>
      <PreviewCanvas options={options} selectedPreset={selectedPreset} />
      {TOOLS_CONFIG.map(
        ({ title, component, propertyName, onChange, selectedProperty }) => (
          <OptionWrapper
            key={title}
            Component={component}
            title={title}
            propertyName={propertyName}
            onSelect={onChange}
            selectedProperty={selectedProperty}
          />
        )
      )}
    </Sidebar>
  );
};

export default memo(OptionsSelector);

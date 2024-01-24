// libs
import { memo, useState } from "react";

// styles
import { Sidebar } from "./OptionsSelector.styles";
import ColorPalette from "./components/ColorPalette";
import OptionWrapper from "./components/OptionWrapper";
import { useCanvasContext } from "../Canvas/Context";

// components

const OptionsSelector = () => {
  const { setOptions, options, selectedPreset } = useCanvasContext();

  const updateOptions = (propertyName, property) => {
    setOptions((prevState) => ({ ...prevState, [propertyName]: property }));
  };

  const TOOLS_CONFIG = [
    {
      title: "Stroke",
      component: ColorPalette,
      propertyName: "stroke",
      onChange: updateOptions,
    },
    {
      title: "Fill",
      component: ColorPalette,
      propertyName: "fill",
      onChange: updateOptions,
    },
  ];

  return (
    <Sidebar>
      {TOOLS_CONFIG.map(({ title, component, propertyName, onChange }) => (
        <OptionWrapper
          key={title}
          Component={component}
          title={title}
          propertyName={propertyName}
          onSelect={onChange}
        />
      ))}
    </Sidebar>
  );
};

export default memo(OptionsSelector);

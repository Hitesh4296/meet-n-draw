import {
  MemoExoticComponent,
} from "react";
import { ColorPaletteProps } from "../ColorPalette/ColorPalette";

interface OptionWrapperProps {
  onSelect: (propertyName: string, options: any) => void;
  propertyName: string;
  title: string;
  Component: MemoExoticComponent<({ onChange, selectedProperty }: ColorPaletteProps) => JSX.Element>;
  selectedProperty: string;
}

const OptionWrapper = ({
  onSelect,
  propertyName,
  title,
  Component,
  selectedProperty,
}: OptionWrapperProps) => {
  const applyProperty = (property) => {
    onSelect(propertyName, property);
  };

  return (
    <div>
      {title}
      <Component
        onChange={applyProperty}
        selectedProperty={selectedProperty}
      ></Component>
    </div>
  );
};

export default OptionWrapper;

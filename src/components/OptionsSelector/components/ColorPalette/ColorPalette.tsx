import { memo, useState } from "react";

// defs
interface ColorPaletteProps {
  onChange: (color: string) => void;
}

// styles
import {
  ColorSwatch,
  ColorPicker,
  Container,
  ColorCodeInput,
  CustomColorContainer,
  ColorInputContainer,
} from "./ColorPalette.styles";

const BASE_COLOR_SWATCHES = ["FF6900", "FCB900", "7BDCB5", "00D084"];

const ColorPalette = ({ onChange }: ColorPaletteProps) => {
  const [customColor, setCustomColor] = useState<string>("000000");

  const colorChangeHandler = (color: string) => {
    setCustomColor(color);
    onChange(`#${color}`);
  };

  return (
    <Container>
      {BASE_COLOR_SWATCHES.map((colorCode, index) => (
        <ColorSwatch
          $colorCode={colorCode}
          key={index}
          onClick={() => onChange(`#${colorCode}`)}
        />
      ))}
      <CustomColorContainer>
        <ColorInputContainer>
          <ColorPicker
            type="color"
            value={`#${customColor}`}
            onChange={(e) => colorChangeHandler(e.target.value.slice(1))}
          />
        </ColorInputContainer>
        <ColorCodeInput
          type="text"
          value={customColor}
          onChange={(e) => colorChangeHandler(e.target.value)}
        />
      </CustomColorContainer>
    </Container>
  );
};

export default memo(ColorPalette);

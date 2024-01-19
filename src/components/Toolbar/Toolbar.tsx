// libs
import { memo } from "react";

// context
import { useCanvasContext } from "../Canvas/Context";

// icons
import {
  PenModeIcon,
  EllipseIcon,
  RectangleIcon,
  DiamondIcon,
  ArrowIcon,
  FreedrawIcon,
  TextIcon,
  LineIcon,
} from "../Icons";

// styles
import { Toolbar as Container, IconContainer } from "./Toolbar.styles";
import { SHAPE_PRESETS } from "../Canvas/types";

const Toolbar = () => {
  const { selectedPreset, setPreset } = useCanvasContext();

  const ICONS_CONFIG = [
    { icon: LineIcon, presetIdentifier: SHAPE_PRESETS.LINE, fillable: false },
    { icon: ArrowIcon, presetIdentifier: SHAPE_PRESETS.ARROW, fillable: false },
    {
      icon: RectangleIcon,
      presetIdentifier: SHAPE_PRESETS.RECTANGLE,
      fillable: true,
    },
    {
      icon: EllipseIcon,
      presetIdentifier: SHAPE_PRESETS.ELLIPSE,
      fillable: true,
    },
    {
      icon: FreedrawIcon,
      presetIdentifier: SHAPE_PRESETS.FREE_DRAW,
      fillable: true,
    },
    { icon: TextIcon, presetIdentifier: SHAPE_PRESETS.TEXT, fillable: false },
  ];

  return (
    <Container>
      {ICONS_CONFIG.map((item, index) => (
        <IconContainer
          key={index}
          $isSelected={selectedPreset === item.presetIdentifier}
          $isFillable={item.fillable}
          onClick={() => {
            setPreset(item.presetIdentifier);
          }}
        >
          {item.icon}
        </IconContainer>
      ))}
    </Container>
  );
};

export default memo(Toolbar);

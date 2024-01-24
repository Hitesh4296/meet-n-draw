// libs
import { memo } from "react";

// context
import { useCanvasContext } from "../Canvas/Context";

// icons
import {
  UndoIcon,
  EllipseIcon,
  RectangleIcon,
  RedoIcon,
  ArrowIcon,
  FreedrawIcon,
  TextIcon,
  LineIcon,
  DiamondIcon,
} from "../Icons";

// styles
import { Toolbar as Container, IconContainer } from "./Toolbar.styles";
import { ACTION_TYPES, SHAPE_PRESETS } from "../Canvas/types";

const Toolbar = () => {
  const { selectedPreset, setPreset, undoAction, redoAction, setActionType } =
    useCanvasContext();

  const ICONS_CONFIG = [
    { icon: LineIcon, presetIdentifier: SHAPE_PRESETS.LINE, fillable: false },
    { icon: ArrowIcon, presetIdentifier: SHAPE_PRESETS.ARROW, fillable: false },
    {
      icon: RectangleIcon,
      presetIdentifier: SHAPE_PRESETS.RECTANGLE,
      fillable: true,
    },
    {
      icon: DiamondIcon,
      presetIdentifier: SHAPE_PRESETS.DIAMOND,
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

  const ACTION_ITEMS = [
    { icon: UndoIcon, actionCallback: undoAction, fillable: false },
    { icon: RedoIcon, actionCallback: redoAction, fillable: false },
  ];

  return (
    <Container>
      {ACTION_ITEMS.map((item, index) => (
        <IconContainer
          key={index}
          $isSelected={false}
          $isFillable={item.fillable}
          onClick={item.actionCallback}
        >
          {item.icon}
        </IconContainer>
      ))}
      {ICONS_CONFIG.map((item, index) => (
        <IconContainer
          key={index}
          $isSelected={selectedPreset === item.presetIdentifier}
          $isFillable={item.fillable}
          onClick={() => {
            setPreset(item.presetIdentifier);
            setActionType(ACTION_TYPES.IDLE);
          }}
        >
          {item.icon}
        </IconContainer>
      ))}
    </Container>
  );
};

export default memo(Toolbar);

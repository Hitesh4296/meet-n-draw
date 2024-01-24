import {
  JSXElementConstructor,
  ReactComponentElement,
  ReactElement,
} from "react";

interface OptionWrapperProps {
  onSelect: (propertyName: string, options: any) => void;
  propertyName: string;
  title: string;
  Component: ({ onChange }: any) => JSX.Element;
}

const OptionWrapper = ({
  onSelect,
  propertyName,
  title,
  Component,
}: OptionWrapperProps) => {
  const applyProperty = (property) => {
    onSelect(propertyName, property);
  };

  return (
    <div>
      {title}
      <Component onChange={applyProperty}></Component>
    </div>
  );
};

export default OptionWrapper;

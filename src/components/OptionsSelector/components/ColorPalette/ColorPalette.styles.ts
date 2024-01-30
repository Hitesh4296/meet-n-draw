import styled from "styled-components";

export const ColorSwatch = styled.div<{
  $colorCode: string;
  $isSelected: boolean;
}>`
  height: 24px;
  width: 24px;
  border-radius: 2px;
  margin: 0 6px 6px 0;
  background: ${({ $colorCode }) => `#${$colorCode}`};
  border: 1px solid #fff;
  border-color: ${({ $isSelected }) => ($isSelected ? "#000" : "#fff")};
  display: inline-block;
`;

export const ColorInputContainer = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 2px;
  margin: 0 6px 6px 0;
  overflow: hidden;
  display: inline-block;
  flex: none;
`;

export const ColorPicker = styled.input`
  height: 40px;
  width: 40px;
  display: inline-block;
  border-radius: 2px 0px 0px 2px;
  border: none;
  border-color: transparent;
  position: relative;
  left: -5px;
  top: -5px;
`;

export const CustomColorContainer = styled.div<{$isSelected: boolean}>`
  height: 24px;
  width: 84px;
  display: inline-flex;
  position: relative;
  top: -6px;
  overflow: hidden;
  border: 1px solid #fff;
  border-color: ${({ $isSelected }) => ($isSelected ? "#000" : "#fff")};
`;

export const ColorCodeInput = styled.input`
  width: 60px;
  height: 24px;
  display: inline-block;
  border-radius: 0 2px 2px 0;
  padding: 0;
  position: relative;
  left: -6px;
  border: none;
  outline: none;
  padding-left: 4px;
`;

export const Container = styled.div`
  width: 100%;
`;

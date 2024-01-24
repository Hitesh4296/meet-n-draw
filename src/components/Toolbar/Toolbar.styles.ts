import styled from "styled-components";

export const Toolbar = styled.div`
  position: absolute;
  height: 42px;
  border-radius: 8px;
  min-width: 200px;
  background: ivory;
  box-shadow: 0px 0px 0.9310142993927002px 0px rgba(0, 0, 0, 0.17),
    0px 0px 3.1270833015441895px 0px rgba(0, 0, 0, 0.08),
    0px 7px 14px 0px rgba(0, 0, 0, 0.05);
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  padding: 6px;
`;

export const IconContainer = styled.div<{
  $isSelected: boolean;
  $isFillable: boolean;
}>`
  height: 30px;
  width: 30px;
  border-radius: 8px;
  overflow: hidden;
  margin-right: 6px;

  :hover {
    background: #e0dffe;
  }

  ${({ $isSelected, $isFillable }) => `
    background: ${$isSelected ? "#e0dffe" : ""};

    svg {
      fill: ${$isFillable && $isSelected ? "#000" : ""}
    }
  `}
`;

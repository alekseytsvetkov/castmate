import { lighten } from 'polished';
import React from 'react'
import styled from 'styled-components';

type SubmitProps = {
  mainColor?: string;
  isFirst?: boolean;
  isLast?: boolean;
  isGroup?: boolean;
};

const getBorderRadius = (
  { isFirst, isGroup, isLast }: SubmitProps,
  size: string
) => {
  if (!isGroup) return size;
  const isIn = isGroup && !isFirst && !isLast;
  if (isIn) return '0px';
  if (isFirst) return `${size} 0 0 ${size}`;
  if (isLast) return `0 ${size} ${size} 0`;
  return size;
};

const SubmitBox = styled.button<SubmitProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 14px;
  height: 50px;
  font-size: 14px;
  width: 100%;
  margin-top: 20px;
  background: ${({ mainColor, theme }) => theme.colors[mainColor || 'castmate']};
  border-radius: ${(props) => getBorderRadius(props, '12px')};
  cursor: pointer;
  color: ${({ mainColor, theme }) =>
    lighten(1.5, theme.colors[mainColor || 'castmate'])};
  border: none;
  ${({ isGroup, isLast }) =>
    (isGroup || !isLast) && `margin-right: 1px;`} outline: none;
  ${({ isLast }) =>
    isLast && `margin-right: 20px;`};
  transition: background 0.12s ease-in, color 0.12s ease-in,
    box-shadow 0.12s ease-in;
  i {
    font-size: 15px;
  }
  :focus {
    background: ${({ mainColor, theme }) =>
      lighten(0.1, theme.colors[mainColor || 'castmate'])};
  }
  :hover {
    background: ${({ mainColor, theme }) =>
      lighten(0.05, theme.colors[mainColor || 'castmate'])};
  }
  :disabled {
    background: ${({ mainColor, theme }) => theme.colors.accent1};
    cursor: not-allowed;
  }
`;

export const Submit = ({ children, disabled }) => {
  return (
    <SubmitBox
      type="submit"
      disabled={disabled}
    >
      {children}
    </SubmitBox>
  )
}

export default Submit

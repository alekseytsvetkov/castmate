import * as React from 'react';
import styled from 'styled-components';

type InputProps = {
  isFirst?: boolean;
  isFull?: boolean;
  mainColor?: string;
  required?: boolean;
}

const InputWrap = styled.div<InputProps>`
  position: relative;
  display: flex;
  align-items: center;
  ${({ isFull }) =>
    isFull && `width: 100%;`};
`;

const IconWrap = styled.div`
  position: absolute;
  left: 20px;
`;

export const InputBox = styled.input<InputProps>`
  border: none;
  background: ${({ mainColor, theme }) => theme.colors[mainColor || 'dark2']};
  color: ${({ theme }) => theme.colors.accent2};
  font-size: 14px;
  border-radius: 12px;
  padding: 17px;
  padding-left: 50px;
  padding-right: 20px;
  outline: none;
  width: 100%;
  ${({ isFirst }) =>
    isFirst && `margin-right: 20px;`};
`;

export const Input = ({ placeholder, icon, isFirst, isFull, mainColor, required }) => (
  <InputWrap isFull={isFull}>
    <IconWrap>{icon}</IconWrap>
    <InputBox type="text" placeholder={placeholder} isFirst={isFirst} mainColor={mainColor} required={required} />
  </InputWrap>
);

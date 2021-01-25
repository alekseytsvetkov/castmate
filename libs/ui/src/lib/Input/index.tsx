import * as React from 'react';
import styled from 'styled-components';

const InputWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;


const IconWrap = styled.div`
  position: absolute;
  left: 20px;
`;

const InputBox = styled.input`
  border: none;
  background: ${({ theme }) => theme.colors.dark2};
  color: ${({ theme }) => theme.colors.accent2};
  font-size: 14px;
  margin-right: 20px;
  border-radius: 12px;
  padding: 17px;
  padding-left: 50px;
  padding-right: 20px;
  outline: none;
`;

export const Input = ({ placeholder, icon }) => (
  <InputWrap>
    <IconWrap>{icon}</IconWrap>
    <InputBox type="text" placeholder={placeholder} />
  </InputWrap>
);

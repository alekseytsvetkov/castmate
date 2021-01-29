import React from 'react';
import { FC } from 'react';
import styled from 'styled-components';
import getConfig from 'next/config';
import { Box } from 'react-feather';
import { Logo } from '../Community/Logo';
const { publicRuntimeConfig } = getConfig();

const AuthBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  max-width: 280px;
  width: 280px;
`;

const AuthTitle = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  padding: 20px;
  color: ${({ theme }) => theme.colors.text1};
`;

const AuthDescription = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 15px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.accent2};
`;

const SocialForm = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const LoginButton = styled('a')<{
  cColor: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  margin: 5px;
  text-align: center;
  border-radius: 9px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  background: ${props => props.cColor};
  :hover {
    transform: scale(1.03);
  }
`;

const SocialIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 62px;
  font-size: 20px;
  height: 100%;
`;

const SocialTitle = styled.div<{
  color: string;
}>`
  opacity: 0.85;
  font-size: 13px;
  height: 40px;
  padding-right: 62px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  ${({ color }) =>
    color && `color: ${color};`};
`;

const LogoBox = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SocialButton = ({ bgColor, color, path, icon, title }) => (
  <LoginButton
    cColor={bgColor}
    href={`${publicRuntimeConfig.apiUrl}auth/${path}`}
  >
    {/* <SocialIcon>{icon}</SocialIcon> */}
    <SocialIcon></SocialIcon>
    <SocialTitle color={color}>{title}</SocialTitle>
  </LoginButton>
);

export const Auth: FC = () => (
  <AuthBox>
    <LogoBox>
      <Logo />
    </LogoBox>
    <AuthTitle>Welcome to Castmate</AuthTitle>
    <AuthDescription>Social network for synchronous media viewing</AuthDescription>
    <SocialForm>
      <SocialButton
        bgColor={'#4285F4'}
        color={'#fff'}
        path="google"
        icon={<Box size="18px" color="#fff"/>}
        title="Google"
      />
      <SocialButton
        bgColor={'#000000'}
        color={'#fff'}
        path="apple"
        icon={<Box size="18px" color="#fff"/>}
        title="Apple"
      />
      <SocialButton
        bgColor={'#E8453C'}
        color={'#fff'}
        path="youtube"
        icon={<Box size="18px" color="#fff"/>}
        title="YouTube"
      />
      <SocialButton
        bgColor={'#6542a6'}
        color={'#fff'}
        path="twitch"
        icon={<Box size="18px" color="#fff"/>}
        title="Twitch"
      />
      <SocialButton
        bgColor={'#1e2532'}
        color={'#fff'}
        path="phone"
        icon={<Box size="18px" color="#fff"/>}
        title="Phone"
      />
    </SocialForm>
  </AuthBox>
);

export default Auth;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @keyframes fadeIn{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    min-height: 0;
    min-width: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  #__next,
  #__layout {
    height: 100%;
    width: 100%;
    overflow-y: hidden;
    outline: none;
  }
  .rc-dropdown {
    position: absolute;
    z-index: 1070;
  }
  .rc-dropdown-hidden {
    display: none;
  }
  #nprogress {
    pointer-events: none;
  }
  #nprogress .bar {
    background: #0E78F9;
    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }
  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #fff, 0 0 5px #fff;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }
  .rc-tabs-nav-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background: #394158;
    border-radius: 12px;
    padding: 4px;
    transition: none;
  }
  .rc-tabs-tab-btn {
    text-align: center;
    padding: 8px 16px;
    outline: none;
    align-self: center;
    width: 100%;
    :focus {
      outline: none;
    }
  }
  .rc-tabs-tab-btn[aria-disabled="true"] {
    cursor: not-allowed
  }
  .rc-tabs-tab {
    min-width: 144px;
    background: #293042;
    border-radius: 10px;
    display: flex;
    min-height: 50px;
    cursor: pointer;
  }
  .rc-tabs-tab.rc-tabs-tab-active {
    background: #1e2532;
  }
  .rc-tabs-tabpane {
    outline: none;
    :focus {
      outline: none;
    }
    color: #fff;
  }
  .rc-tabs-ink-bar {
    display: none;
  }
  .rc-tabs-nav-operations {
    display: none;
  }
  .rc-tabs-content-holder {
    padding: 20px 0;
  }
`;

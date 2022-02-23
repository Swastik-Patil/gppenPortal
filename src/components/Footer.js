import React from "react";
import styled from "styled-components";
function Footer() {
  return (
    <Content>
      © {new Date().getFullYear()} Government Polytechnic Pen. All rights
      reserved
    </Content>
  );
}

export default Footer;
const Content = styled.footer`
  position: absolute;
  text-align: center;
  height: 29px;
  color: white;
  bottom: 4px;
  font-family: Josefin Sans;
  font-style: normal;
  font-weight: 300;
  font-size: 18px;
  @media (max-width: 650px) {
    bottom: 35px;
    font-size: 1rem;
  }
`;

import React from "react";
import styled from "styled-components";
import img from "../res/Unauthorize.png";
function Unauthorize() {
  return (
    <Container>
      <Img src={img} />
      <span>This page is not publically available.</span>
      <Btn>Return To HOME page</Btn>
    </Container>
  );
}

export default Unauthorize;
const Container = styled.div`
  display: block;
  flex-direction: column;
  justify-content: center;
  span {
    color: #8e489c;
    display: block;
    font-weight: bold;
    font-size: 40px;
  }
`;
const Img = styled.img`
  height: 70vh;
  width: 100%;
  @media (max-width: 650px) {
    width: 100%;
    height: 350px;
  }
`;
const Btn = styled.button`
  font-weight: bold;
  border: 3px solid #8e489c;
  font-size: 15px;
  border-radius: 10px;
  padding: 10px 10px;
  background: #8e489c;
  margin: 30px;
  color: white;
`;

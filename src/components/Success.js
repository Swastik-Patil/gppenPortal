import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";

function Success({ date }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {};
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      {loading ? (
        <>
          <BeatLoader color="#1A2B40" size={18} margin={2} loading={loading} />
        </>
      ) : (
        <Contain>
          <Header />
          <Content>
            <h1>
              Your Bonafide certificate is ready , Visit College on {date}
            </h1>
          </Content>
          <Footer />
        </Contain>
      )}
    </div>
  );
}

export default Success;

const Contain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;

  background: rgb(20, 20, 149);
  background: linear-gradient(
    90deg,
    rgba(20, 20, 149, 1) 37%,
    rgba(10, 114, 201, 1) 68%,
    rgba(0, 212, 255, 1) 100%
  );

  @media (max-width: 650px) {
    position: absolute;
    height: 100vh;
    background: rgb(20, 20, 149);
    background: linear-gradient(
      90deg,
      rgba(20, 20, 149, 1) 37%,
      rgba(10, 114, 201, 1) 68%,
      rgba(0, 212, 255, 1) 100%
    );
    width: auto;
  }
`;
const Content = styled.div`
  width: 80%;
  background-color: green;
  display: flex;
  height: 40%;
  border: 2px solid white;
  border-radius: 50px;
  background-color: whitesmoke;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.25);
  h1 {
    font-size: 30px;
  }
  @media (max-width: 650px) {
    h1 {
      font-size: 20px;
    }
  }
`;

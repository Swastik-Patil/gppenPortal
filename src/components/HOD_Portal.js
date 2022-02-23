import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import { useAuth } from "../contexts/AuthContext";
import Header from "./Header";
import HOD_Pending_Icon from "../res/HOD_Pending_Icon.png";
import HOD_Rejected_Icon from "../res/HOD_Rejected_Icon.png";
import HOD_Approved_Icon from "../res/HOD_Approved_Icon.png";
import HOD_Control_Panel_Icon from "../res/records.png";
import BeatLoader from "react-spinners/BeatLoader";

function HOD_Portal() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  function checkAuthorization() {
    const emails = [
      "hodcomputer@gmail.com",
      "hodcivil@gmail.com",
      "hodmechanical@gmail.com",
      "hodchemical@gmail.com",
      "hodic@gmail.com",
    ];
    if (emails.indexOf(currentUser.email) === -1) {
      window.location.replace("/profile");
    }
  }

  useEffect(() => {
    checkAuthorization();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => {};
  });

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
            <a href="/HODPending">
              <Wrap>
                <img src={HOD_Pending_Icon} alt="Pending_Icon" />
                <p>Pending Applications</p>
              </Wrap>
            </a>
            <a href="/HODApproved">
              <Wrap>
                <img src={HOD_Approved_Icon} alt="Approved_Icon" />
                <p>Approved Applications</p>
              </Wrap>
            </a>
            <a href="/HODRejected">
              <Wrap>
                <img src={HOD_Rejected_Icon} alt="Rejected_Icon" />
                <p>Rejected Applications</p>
              </Wrap>
            </a>
            <a href="/HODControlPanel">
              <Wrap>
                <img src={HOD_Control_Panel_Icon} alt="Folder_Icon" />
                <p>Upload Student Details</p>
              </Wrap>
            </a>
          </Content>
          <Footer />
        </Contain>
      )}
    </div>
  );
}

export default HOD_Portal;

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
  background: #00c6ff; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #0072ff,
    #00c6ff
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #002aff, #00c6ff);
  @media (max-width: 650px) {
    height: 110vh;
    background: linear-gradient(to right, #002aff, #00c6ff);
    width: 100%;
  }
`;
const Content = styled.div`
  position: absolute;
  display: flex;
  color: transparent;
  align-items: center;
  justify-content: center;
  width: auto;
  @media (max-width: 650px) {
    flex-direction: column;
    a {
      width: auto;
      height: 190px;
    }
  }
`;
const Wrap = styled.div`
  display: flex;
  margin: 20px;
  padding: 10px;
  width: 16rem;
  height: 16rem;
  color:black;
  flex-direction: column;
  background: #ECE9E6;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #FFFFFF, #ECE9E6);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #FFFFFF, #ECE9E6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */  
  border: 3px solid rgba(78, 75, 75, 0.6);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 39px;
  align-items: center;
  justify-content:center;
transition:all 250ms ease-in-out;
cursor:pointer;
  img {
      margin-top:30px;
      height: 7rem;
      width: 7rem; 
    }
  p {
      font-weight:bold;
      color:black;
      margin-top:20px;
      font-size: 1.2rem;
    }
    
  &:hover {
  
    box-shadow: rgba(0 0 0 / 30%) 0px 40px 58px -16px,
      rgba(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
  }
  @media (max-width: 650px) {
    display: flex;
    margin:10px;
    padding: 5px;
    width: 11.5rem;
    height: 10rem;
    border: 3px solid rgba(78, 75, 75, 0.6);
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 39px;
    flex-direction: column;
    align-items: center;
    transition:all 250ms ease-in-out;
    cursor:pointer;
    img {
      margin-top:10px;
      height: 4rem; 
      width: 4rem; 
    }
    p {
      font-weight: bold;
      color: black;
      margin-top: 20px;
      font-size: 0.8rem;
    }
      }
      }
    }
`;

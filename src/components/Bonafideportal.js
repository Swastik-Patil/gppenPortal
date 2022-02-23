import React, { useState, useEffect } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import newform from "../res/newfomlogo.png";
import myapplication from "../res/myApplication.png";
import pointer from "../res/pointer.png";
import Footer from "./Footer";
import BeatLoader from "react-spinners/BeatLoader";
import Header from "./Header";
import Success from "../components/Success";

function Studentportal() {
  const [loading, setLoading] = useState(true);

  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);

  function readUserPastData() {
    const db = dbref(database);
    get(child(db, `/history/approved/${currentUser.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          setUserData(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function checkAuthorization() {
    const hodemails = [
      "hodcomputer@gmail.com",
      "hodcivil@gmail.com",
      "hodmechanical@gmail.com",
      "hodchemical@gmail.com",
      "hodic@gmail.com",
    ];
    if (hodemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/HODPortal");
    }
    const studemails = ["studentsection@gmail.com"];
    if (studemails.indexOf(currentUser.email) !== -1) {
      window.location.replace("/StudentSectionPortal");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    checkAuthorization();
    readUserPastData();
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
          {userData ? (
            <Success date={userData.remark} />
          ) : (
            <Content>
              <a href="/bonafideapplication">
                <Wrap>
                  <img src={newform} alt="newForm_Icon" />
                  <p>New Application</p>
                </Wrap>
              </a>
              <a href="/trackApplication">
                <Wrap>
                  <img src={pointer} alt="track_Icon" />
                  <p>Track Application</p>
                </Wrap>
              </a>
              <a href="/myApplications">
                <Wrap>
                  <img src={myapplication} alt="application_Icon" />
                  <p>My Applications</p>
                </Wrap>
              </a>
            </Content>
          )}
          <Footer />
        </Contain>
      )}
    </div>
  );
}

export default Studentportal;

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
      font-size: 1.5rem;
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
      font-size: 1rem;
    }
      }
      }
    }
`;

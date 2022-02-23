import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { database } from "../utils/init-firebase";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
import Header from "./Header";
import certificate from "../res/certificate.png";
import { Table, Tbody, Tr, Td, Button } from "@chakra-ui/react";
import SS_ActionControlPanel from "./SS_ActionControlPanel";

function LcDetails({ showActionPanel }) {
  const [loading, setLoading] = useState(true);
  const [pendingData, setPendingData] = useState(null);

  function readUserCurrentData() {
    const db = dbref(database);
    const IDRef = window.sessionStorage.getItem("selectedStudent");
    const path = window.sessionStorage.getItem("path");
    console.log(IDRef + " " + path);
    if (!IDRef) window.location.href = "/profile";
    get(child(db, `${path}/${IDRef}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setPendingData(data);
        } else {
          // window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  useEffect(() => {
    readUserCurrentData();
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
            <Title>Student Details</Title>
            <Holder>
              <TableHodler>
                <Table
                  variant="simple"
                  colorScheme="gray"
                  size="md"
                  maxW={{ base: "400px", lg: "1300px" }}
                  borderRadius={{ lg: "20px" }}
                  background="white"
                  margin={{
                    lg: "50px auto",
                    md: "50px auto",
                    base: "20px auto",
                  }}
                >
                  <Tbody>
                    <Tr>
                      <Td fontWeight={"bold"}>Full Name :</Td>
                      <Td>
                        {pendingData.fname +
                          " " +
                          pendingData.mname +
                          " " +
                          pendingData.lname}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Email :</Td>
                      <Td>{pendingData.email}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Contact no :</Td>
                      <Td>{pendingData.phone_no}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Date of Birth :</Td>
                      <Td>{pendingData.dob}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableHodler>
              <TableHodler>
                <Table
                  variant="simple"
                  colorScheme="gray"
                  size="md"
                  maxW={{ base: "400px", lg: "1300px" }}
                  borderRadius={{ lg: "20px" }}
                  background="white"
                  margin={{
                    lg: "50px auto",
                    md: "50px auto",
                    base: "20px auto",
                  }}
                >
                  <Tbody>
                    <Tr>
                      <Td fontWeight={"bold"}>Enrollment no :</Td>
                      <Td>{pendingData.enroll}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Branch and Year :</Td>
                      <Td>{pendingData.branch + " " + pendingData.year}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Roll no :</Td>
                      <Td>{pendingData.roll_no}</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight={"bold"}>Gender :</Td>
                      <Td>{pendingData.gender}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableHodler>
              <DocumentHolder>
                <h3>Documents</h3>
                <img src={certificate} alt="BirthCerti"></img>
                <div>
                  <a
                    href={pendingData.birthCerti}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Button colorScheme={"blue"}>View Birth Certificate</Button>
                  </a>
                  <a href={pendingData.idCard} target="_blank" rel="noreferrer">
                    <Button colorScheme={"blue"}>View ID Card</Button>
                  </a>
                </div>
              </DocumentHolder>
              {/* <DocumentHolder>
                <h3>Id Card</h3>
                <img src={certificate} alt="idCard"></img>
                <a href={pendingData.idCard} target="_blank" rel="noreferrer">
                  <Button colorScheme={"blue"}>View</Button>
                </a>
              </DocumentHolder> */}
            </Holder>
            <ActionPanelHolder>
              {!showActionPanel || !pendingData.isPending ? (
                <a href="/profile">
                  <Button colorScheme={"red"} float="right" marginTop={"10px"}>
                    Back
                  </Button>
                </a>
              ) : (
                <SS_ActionControlPanel ele={pendingData} />
              )}
            </ActionPanelHolder>
          </Content>
        </Contain>
      )}
    </div>
  );
}

const Contain = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(135deg, #fdd819 10%, #e80505 100%);
  @media (max-width: 650px) {
    position: absolute;
    height: 100%;
    width: 100%;
  }
`;
const Content = styled.div`
  color: black;
  margin-top: 80px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  background-color: white;
  height: 550px;
  width: 90%;
  boder: 1px solid white;
  border-radius: 12px;
  box-shadow: 2px 3px 3px black;
  @media (max-width: 650px) {
    flex-direction: column;
    height: 600px;
    gap: 0px;
    font-size: 12px;
  }
`;
const Holder = styled.div`
  display: flex;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  height: auto;
  width: 100%;
  @media (max-width: 650px) {
    flex-direction: column;
    justify-content: initial;
    height: 600px;
    padding: 0px 0px;
  }
`;
const Title = styled.div`
  width: 95%;
  height: 40px;
  margin-top: 22px;
  border-bottom: 4px solid #147af2;
  font-size: 30px;
  padding-bottom: 12px;
  display: flex;
  align-items: center;
`;
const TableHodler = styled.div`
  margin: 5px 12px;
  @media (max-width: 650px) {
    margin: 0px 0px;
    width: 300px;
  }
`;

const DocumentHolder = styled.div`
  height: 350px;
  width: 250px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 12px;
  box-shadow: 6px 6px 6px grey;

  h3 {
    margin: 10px;
    font-weight: bold;
  }

  img {
    height: 186px;
    width: 186px;
  }

  div {
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
`;

const ActionPanelHolder = styled.div`
  height: 55px;
  width: 95%;
  border-top: 4px solid #147af2;
`;

export default LcDetails;

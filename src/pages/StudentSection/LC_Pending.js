import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../utils/init-firebase";
import BeatLoader from "react-spinners/BeatLoader";
import styled from "styled-components";
import Header from "../../components/Header";
import BG from "../../res/BonafideFormBG.jpg";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Button,
} from "@chakra-ui/react";

function LC_Pending() {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  let userData = [];
  const [allData, setallData] = useState([]);
  let keyIndex = 0;

  const [input, setInput] = useState("");

  function checkAuthorization() {
    const emails = ["studentsection@gmail.com"];
    if (emails.indexOf(currentUser.email) === -1) {
      window.location.replace("/profile");
    }
  }

  function readUserPastData() {
    const db = dbref(database);

    get(child(db, `/lcusers/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          Object.keys(data).forEach((key) => {
            if (data[key].isPending) userData.push(data[key]);
          });
          setallData(userData);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }

  function showApplicationDetails(uid) {
    window.sessionStorage.setItem("selectedStudent", String(uid));
    window.sessionStorage.setItem("path", "/lcusers");
    window.location.href = "/LcDetails";
  }

  useEffect(() => {
    checkAuthorization();
    readUserPastData();
    return () => {};
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    match();
  };

  const match = () => {
    var table, tr, td, i, txtValue;
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.indexOf(input) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  };

  const BarStyling = {
    width: "20rem",
    background: "#F2F1F9",
    border: "none",
    padding: "0.5rem",
  };

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
            {allData.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "650px",
                  fontWeight: "bold",
                  overflow: "hidden",
                }}
              >
                <h2>No Previous Applications</h2>
              </div>
            ) : (
              <>
                <div>
                  <input
                    style={BarStyling}
                    key="random1"
                    value={input}
                    placeholder={"Search"}
                    onChange={handleInputChange}
                  />
                  <button
                    style={{
                      background: "skyblue",
                      width: "5rem",
                      height: "2.5em",
                    }}
                    onClick={match}
                  >
                    Search
                  </button>
                </div>

                <Table
                  id="myTable"
                  colorScheme="facebook"
                  variant="simple"
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
                  <TableCaption>Previous Applications</TableCaption>
                  <Thead textAlign="center">
                    <Tr>
                      <Th
                        fontSize={{ lg: "lg", md: "lg", base: "12px" }}
                        color={"black"}
                        fontFamily={"calibri"}
                      >
                        Sr. No.
                      </Th>
                      <Th
                        fontSize={{ lg: "lg", md: "lg", base: "12px" }}
                        color={"black"}
                        fontFamily={"calibri"}
                      >
                        Enrollment No.
                      </Th>
                      <Th
                        fontSize={{ lg: "lg", md: "lg", base: "12px" }}
                        color={"black"}
                        fontFamily={"calibri"}
                      >
                        Applied Date
                      </Th>
                      <Th
                        fontSize={{ lg: "lg", md: "lg", base: "12px" }}
                        color={"black"}
                        fontFamily={"calibri"}
                      >
                        Status
                      </Th>
                      <Th
                        fontSize={{ lg: "lg", md: "lg", base: "12px" }}
                        color={"black"}
                        fontFamily={"calibri"}
                      >
                        Application
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody textAlign="center">
                    {allData.map((ele) => {
                      return (
                        <Tr key={keyIndex}>
                          <Td>{++keyIndex}</Td>
                          <Td>{ele.enroll}</Td>
                          <Td>
                            {new Date(ele.appliedDate).getDate() +
                              "/" +
                              new Date(ele.appliedDate).getMonth() +
                              1 +
                              "/" +
                              new Date(ele.appliedDate).getFullYear()}
                          </Td>
                          <Td style={{ color: "blue", fontWeight: "bold" }}>
                            Pending
                          </Td>
                          <Td>
                            <Button
                              colorScheme="teal"
                              variant="solid"
                              onClick={() => {
                                showApplicationDetails(ele.uid);
                              }}
                            >
                              View
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </>
            )}
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

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;

  background: url(${BG});
  @media (max-width: 650px) {
    position: absolute;
    height: 100%;
    width: auto;
  }
`;
const Content = styled.div`
  color: black;
  margin-top: 80px;
  overflow: scroll;
  display: flex;
  align-items: center;
  justify-content: intital;
  padding: 20px;
  flex-direction: column;
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
    height: 560px;
    font-size: 12px;
    margin-top: 5px;
  }
`;
export default LC_Pending;

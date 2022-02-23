import React, { useState } from "react";
import { ref as dbref, remove, update, push, set } from "firebase/database";
import { database } from "../utils/init-firebase";
import styled from "styled-components";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function SS_ActionControlPanel({ ele }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();
  const [isOpen2, setIsOpen2] = React.useState(false);
  const onClose2 = () => setIsOpen2(false);
  const cancelRef2 = React.useRef();
  const [IP, setIP] = useState(null);

  function handleReject() {
    getIpaddress();
    let remark = String(document.getElementById("remark").value);
    onClose(true);
    if (remark.length > 0) {
      rejectStudent(remark);
    } else alert("Empty Remark found !");
  }

  function handleApprove() {
    getIpaddress();
    let remark = document.getElementById("remark2").value;
    console.log(remark);
    if (remark.length > 0) {
      approveStudent(remark);
    } else alert("Empty Remark found !");
  }

  function rejectStudent(remark) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      if (!ele.isRejected || !ele.isApproved) {
        ele.isPending = false;
        ele.isRejected = true;
        let date = new Date(Date.now());
        set(dbref(db, "/lcusers/" + IDRef), {
          ...ele,
          remark: remark,
          actionDate:
            date.getDate() +
            "/" +
            parseInt(date.getMonth() + 1) +
            "/" +
            date.getFullYear(),
        });

        console.log("Rejected successfully");
        const newEle = {
          ...ele,
          HODIP: IP,
          remark: remark,
          actionDate:
            date.getDate() +
            "/" +
            date.getMonth() +
            1 +
            "/" +
            date.getFullYear(),
        };

        const newRef = push(dbref(db, "/lchistory/rejected/" + IDRef));
        set(newRef, {
          ...newEle,
        });

        console.log("Moved to rejected");
        window.location.href = "/LcPending";
      } else {
        console.log("already approved or rejected");
      }
    }
  }
  function approveStudent(remark) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      let date = new Date(Date.now());
      if (!ele.isRejected || !ele.isApproved) {
        ele.isPending = false;
        ele.isApproved = true;
        set(dbref(db, "/lcusers/" + IDRef), {
          ...ele,
        });
        // console.log("Approved successfully");

        update(dbref(db, "/lchistory/approved/" + IDRef), {
          ...ele,
          HODIP: IP,
          remark: remark,
          actionDate:
            date.getDate() +
            "/" +
            date.getMonth() +
            1 +
            "/" +
            date.getFullYear(),
        });
        deleteUserData(ele);
        window.location.href = "/LcPending";
      }
    }
  }

  function deleteUserData(ele) {
    if (ele) {
      const IDRef = ele.uid;
      const db = database;
      remove(dbref(db, "/lcusers/" + IDRef))
        .then(() => {
          console.log("Deleted user data");
        })
        .catch((error) => {
          console.log("unsuccessful, error " + error);
        });
    }
  }

  function getIpaddress() {
    fetch("https://jsonip.com/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIP(data.ip);
        console.log(data.ip);
      })
      .catch((err) => {
        console.log(`There was an error ${err}`);
      });
  }

  return (
    <Contain>
      <Button
        onClick={() => {
          setIsOpen2(true);
        }}
        colorScheme={"green"}
      >
        Approve Application
      </Button>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
        colorScheme={"red"}
      >
        Reject Application
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remark for Rejecting Application
            </AlertDialogHeader>

            <AlertDialogBody>
              <form id="remarkForm">
                <textarea
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                  rows="4"
                  cols="50"
                  id="remark"
                  form="remarkForm"
                  required
                ></textarea>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleReject} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpen2}
        leastDestructiveRef={cancelRef2}
        onClose={onClose2}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remark for Approve Application (Date to collect Leaving
              Certificate)
            </AlertDialogHeader>

            <AlertDialogBody>
              <form id="remarkForm2">
                <input
                  type="date"
                  style={{ border: "1px solid black", borderRadius: "5px" }}
                  id="remark2"
                  form="remarkForm2"
                  required
                ></input>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose2} ml={3}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleApprove} ml={3}>
                Confirm
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Contain>
  );
}

export default SS_ActionControlPanel;

const Contain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 5px;
`;

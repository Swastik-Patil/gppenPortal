import React, { useEffect, useState } from "react";
import { ref as dbref, child, get } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";
import { database } from "../utils/init-firebase";
import Bonafideportal from "../components/Bonafideportal";
import Success from "../components/Success";

export default function Profilepage() {
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
    checkAuthorization();
    readUserPastData();
    return () => {};
  }, []);

  return (
    <React.Fragment>
      {userData ? <Success date={userData.remark} /> : <Bonafideportal />}
    </React.Fragment>
  );
}

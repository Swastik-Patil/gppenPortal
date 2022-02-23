import React, { useEffect, useState } from "react";
import Details from "../components/Details";
import { useAuth } from "../contexts/AuthContext";

function StudentDetails() {
  const { currentUser } = useAuth();
  const [isHOD, setHOD] = useState(false);
  const [isSS, setSS] = useState(false);
  function checkAuthorization() {
    const emails = [
      "hodcomputer@gmail.com",
      "hodcivil@gmail.com",
      "hodmechanical@gmail.com",
      "hodchemical@gmail.com",
      "hodic@gmail.com",
    ];
    if (currentUser && emails.indexOf(currentUser.email) !== -1) {
      setHOD(true);
    }
    const lcemails = ["studentsection@gmail.com"];
    if (currentUser && lcemails.indexOf(currentUser.email) !== -1) {
      setSS(true);
    }
  }
  useEffect(() => {
    checkAuthorization();

    return () => {};
  }, []);

  return (
    <>
      <Details showActionPanel={isHOD} />
    </>
  );
}

export default StudentDetails;

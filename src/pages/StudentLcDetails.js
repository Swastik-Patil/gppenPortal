import React, { useEffect, useState } from "react";
import LcDetails from "../components/LcDetails";
import { useAuth } from "../contexts/AuthContext";

function StudentLcDetails() {
  const { currentUser } = useAuth();
  const [isSS, setSS] = useState(false);
  function checkAuthorization() {
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
      <LcDetails showActionPanel={isSS} />
    </>
  );
}

export default StudentLcDetails;

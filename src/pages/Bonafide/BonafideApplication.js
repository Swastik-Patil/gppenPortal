import React, { useState } from "react";
import { storage, database } from "../../utils/init-firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { set, ref as dbref } from "firebase/database";
import "font-awesome/css/font-awesome.min.css";
import "../../style.css";
import { useAuth } from "../../contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import Header from "../../components/Header";
// import Footer from "../components/Footer";

export default function BonafideApplication() {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  const [isSubmitted, setSubmittedStatus] = useState(false);
  const onSumbitClose = () => {
    setSubmittedStatus(false);
    console.log("Redirecting");
  };
  const BC = "BIRTH_CERTIFICATE";
  const ID = "ID_Card";
  const [gender, setGender] = useState("");
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [RollNo, setRollNo] = useState("");
  const [EnrollNo, setEnrollNo] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const { currentUser } = useAuth();
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleFnameChange = (event) => {
    setFname(event.target.value);
  };
  const handleMnameChange = (event) => {
    setMname(event.target.value);
  };
  const handleLnameChange = (event) => {
    setLname(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);
  };
  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleEnrollNoChange = (event) => {
    setEnrollNo(event.target.value);
  };
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleDateofBirthChange = (event) => {
    setDateofBirth(event.target.value);
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        let fsize = e.target.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 250) {
          alert("File too Big, please select a file less than 250kb");
        } else {
          setFile(e.target.files[0]);
        }
      }
    }
  };
  const handleFileChange2 = (e) => {
    if (e.target.files[0]) {
      for (let i = 0; i <= e.target.files.length - 1; i++) {
        let fsize = e.target.files.item(i).size;
        let file = Math.round(fsize / 1024);
        // The size of the file.
        if (file >= 250) {
          alert("File too Big, please select a file less than 250kb");
        } else {
          setFile2(e.target.files[0]);
        }
      }
    }
  };

  function validateEmail() {
    let p = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    let email = document.getElementById("email").value;
    if (p.test(email)) {
      document.getElementById("email").style.border = "1px solid grey";
      return true;
    } else {
      document.getElementById("email").style.border = "1px solid red";
      return false;
    }
  }
  function validatePhone() {
    var phone = document.getElementById("phone").value;
    var re = /^[0-9][0-9]{9}$/;

    if (re.test(phone)) {
      document.getElementById("phone").style.border = "1px solid grey";
      return true;
    } else {
      document.getElementById("phone").style.border = "2px solid red";
      return false;
    }
  }

  function writeUserData(student) {
    const location = currentUser.uid;

    const db = database;
    set(dbref(db, "users/" + location), {
      uid: location,
      enroll: student.enroll,
      fname: student.fname,
      mname: student.mname,
      lname: student.lname,
      gender: student.gender,
      roll_no: student.roll_no,
      year: student.year,
      branch: student.branch,
      dob: student.dob,
      phone_no: student.phone_no,
      email: student.email,
      birthCerti: student.downloadURL,
      idCard: student.downloadURLID,
      appliedDate: new Date(Date.now()).toString(),
      //internal
      isPending: true,
      isApproved: false,
      isRejected: false,
      //logs
      IPAddress: null,
    });
    setSubmittedStatus(true);
  }

  const handleSubmit = (downloadURLBC, downloadURLID) => {
    // e.preventDefault();
    document.getElementById("UploadButton").innerHTML = `Finishing Up`;
    const student = {
      enroll: document.getElementById("EnrollNo").value,
      fname: document.getElementById("fname").value,
      mname: document.getElementById("mname").value,
      lname: document.getElementById("lname").value,
      gender: document.getElementById("gender").value,
      roll_no: document.getElementById("RollNo").value,
      year: document.getElementById("year").value,
      branch: document.getElementById("branch").value,
      dob: document.getElementById("dateofBirth").value,
      phone_no: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      downloadURL: downloadURLBC,
      downloadURLID: downloadURLID,
    };
    writeUserData(student);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (
      document.getElementById("gender").value === "Select" ||
      !fname ||
      !mname ||
      !lname ||
      !email ||
      !RollNo ||
      !EnrollNo ||
      !phone ||
      document.getElementById("branch").value === "Select" ||
      document.getElementById("year").value === "Select" ||
      !dateofBirth ||
      !validatePhone() ||
      !validateEmail() ||
      !file ||
      !file2
    ) {
      setIsOpen(true);
    } else {
      document.getElementById("UploadButton").innerHTML =
        "Submitting... Please Wait";
      document.getElementById("UploadButton").disabled = true;
      let typeRef = BC;
      const pathRef = currentUser.uid;
      let storageRef = ref(storage, `${pathRef}/${typeRef}/${file.name}`);
      let uploadTask = uploadBytesResumable(storageRef, file);
      console.log("Uploaded");

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          progress.toPrecision(2);
          document.getElementById(
            "UploadButton"
          ).innerHTML = `Uploading... ${parseInt(progress)}%`;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Some error occured ! Please try again");
        }
      );
      typeRef = ID;
      storageRef = ref(storage, `${pathRef}/${typeRef}/${file2.name}`);
      console.log(typeRef);
      let uploadTask2 = uploadBytesResumable(storageRef, file2);
      console.log("Uploaded");
      let URL;
      uploadTask2.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          progress.toPrecision(2);
          document.getElementById(
            "UploadButton"
          ).innerHTML = `Uploading... ${parseInt(progress)}%`;
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          alert("Some error occured ! Please try again");
        },
        () => {
          document.getElementById("UploadButton").innerHTML = `Submitting...`;
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURLBC) => {
            URL = downloadURLBC;
          });
          getDownloadURL(uploadTask2.snapshot.ref).then((downloadURLID) => {
            setTimeout(() => {
              handleSubmit(URL, downloadURLID);
            }, 5000);
          });
        }
      );
    }
  };

  return (
    <>
      <Header />
      <div className="Body">
        <div className="parentContainer">
          <div className="container">
            <div className="wrapper">
              <div className="company-info">
                <h3 style={{ fontSize: "1.17em", fontWeight: "bold" }}>
                  Goverment Polytecnic Pen
                </h3>
                <ul>
                  <li>
                    <i className="fa fa-road"></i>{" "}
                    <span>Shivaji Nagar, Ramwadi, Pen</span>{" "}
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>{" "}
                    <span>(+91) 9405691405</span>
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>{" "}
                    <span>gpraigad1@sancharnet.com</span>
                  </li>
                </ul>
                <ul>
                  {" "}
                  Steps to Follow :
                  <li>1. Fill Up all the details carefully.</li>
                  <li>2. Enter Email which created for college.</li>
                  <li> i.e., Which includes Enrollment No.</li>
                  <li>3. * means Compulsory Field</li>
                </ul>
              </div>
              <div className="contact">
                <h3
                  style={{
                    fontSize: "1.17em",
                    fontWeight: "bold",
                    marginBlockEnd: "1em",
                  }}
                >
                  Bonafide Application
                </h3>
                <form id="contactForm">
                  <p>
                    <label>
                      Gender
                      <span className="required-field"></span>
                    </label>
                    <select
                      type="text"
                      name="gender"
                      id="gender"
                      value={gender}
                      onChange={handleGenderChange}
                    >
                      <option>Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </p>
                  <p>
                    <label>
                      First Name<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={fname}
                      onChange={handleFnameChange}
                    />
                  </p>
                  <p>
                    <label>
                      Middle Name<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="mname"
                      id="mname"
                      value={mname}
                      onChange={handleMnameChange}
                    />
                  </p>
                  <p>
                    <label>
                      Last Name<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={lname}
                      onChange={handleLnameChange}
                    />
                  </p>
                  <p>
                    <label>
                      Roll Number<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="RollNo"
                      id="RollNo"
                      value={RollNo}
                      onChange={handleRollNoChange}
                    />
                  </p>
                  <p>
                    <label>
                      Enrollment Number<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="EnrollNo"
                      id="EnrollNo"
                      value={EnrollNo}
                      onChange={handleEnrollNoChange}
                    />
                  </p>
                  <p>
                    <label>
                      Email Address<span className="required-field"></span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                  </p>
                  <p>
                    <label>
                      Phone Number<span className="required-field"></span>
                    </label>
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </p>
                  <p>
                    <label>
                      Branch<span className="required-field"></span>
                    </label>
                    <select
                      type="text"
                      name="branch"
                      id="branch"
                      value={branch}
                      onChange={handleBranchChange}
                    >
                      <option>Select</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CM">Computer Technology</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="IC">I&C Engineering</option>
                      <option value="CH">Chemical Engineering</option>
                    </select>
                  </p>
                  <p>
                    <label>
                      Year<span className="required-field"></span>
                    </label>
                    <select
                      type="text"
                      name="year"
                      id="year"
                      value={year}
                      onChange={handleYearChange}
                    >
                      <option>Select</option>
                      <option value="1st">First</option>
                      <option value="2nd">Second</option>
                      <option value="3rd">Third</option>
                    </select>
                  </p>
                  <p>
                    <label>
                      Date of Birth<span className="required-field"></span>
                    </label>
                    <input
                      type="date"
                      name="dateofBirth"
                      id="dateofBirth"
                      value={dateofBirth}
                      onChange={handleDateofBirthChange}
                    />
                  </p>
                  <p>
                    <label>
                      Birth Certificate
                      <span className="required-field"></span>
                      <span id="expDesc">
                        ( File should be less than 150 kb )
                      </span>
                    </label>
                    <input
                      type="file"
                      name="fileName"
                      id="myFile"
                      onChange={handleFileChange}
                    />
                  </p>
                  <p>
                    <label id="idLabel" htmlFor="myFile2">
                      College ID Card
                      <span className="required-field"></span>
                      <span id="expDesc">
                        ( File should be less than 150 kb )
                      </span>
                    </label>
                    <input
                      type="file"
                      name="fileName"
                      id="myFile2"
                      onChange={handleFileChange2}
                    />
                  </p>
                  <p className="full">
                    <button
                      type="submit"
                      id="UploadButton"
                      onClick={handleUpload}
                    >
                      Submit
                    </button>
                  </p>
                </form>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Data Missing or Invalid
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Please fill valid data.Empty or Invalid data found
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <Button colorScheme="red" onClick={onClose} ml={3}>
                          Okay
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
                <AlertDialog isOpen={isSubmitted} onClose={onSumbitClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Success
                      </AlertDialogHeader>

                      <AlertDialogBody>
                        Form submitted successfully. Thank you
                      </AlertDialogBody>

                      <AlertDialogFooter>
                        <div style={{ color: "transparent" }}>
                          <Link to="/home">
                            <Button
                              color="white"
                              colorScheme="green"
                              onClick={onSumbitClose}
                              ml={3}
                            >
                              Okay
                            </Button>
                          </Link>
                        </div>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React from "react";
// import logo from "../LogoBonafide.jpg";
// import "../print.css";
import "../styles/BonafidePreview.css";
// import "../databaseRead";

export default function BonafidePreview() {
  /*--This JavaScript method for Print command--*/
  function PrintDoc() {
    var toPrint = document.getElementById("doc");
    var popupWin = window.open(
      "",
      "_blank",
      "max-width=800,max-height=600,margin=1,location=no"
    );
    popupWin.document.open();
    popupWin.document.write(
      '<html><title>::Preview::</title><link rel="stylesheet" type="text/css" href="print.css" /></head><body onload="window.print()">'
    );
    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write("</html>");
    popupWin.document.close();
  }
  /*--This JavaScript method for Print Preview command--*/
  function PrintPreview() {
    var toPrint = document.getElementById("doc");
    var popupWin = window.open(
      "",
      "_blank",
      "max-width=512,max-height=500,margin=1,location=no"
    );
    popupWin.document.open("PrintPreview");
    popupWin.document.write(
      '<html><title>::Print Preview::</title><link rel="stylesheet" type="text/css" href="Print.css" media="screen"/></head><body>'
    );
    popupWin.document.write(toPrint.innerHTML);
    popupWin.document.write("</html>");
    popupWin.document.close();
  }
  return (
    <>
      <div className="container">
        <div id="doc">
          <div className="Border">
            <div className="heading">
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* <img src={logo} alt="Logo" id=" logo" srcSet="" /> */}
              </div>
              <div>
                <p className="header">GOVERNMENT POLYTECHNIC PEN</p>
                <p style={{ fontSize: "small" }}>
                  Shivaji Nagar, Ramwadi, Pen, Dist. Raigad. 402 107.
                </p>
                <p style={{ fontSize: "12px" }}>
                  Ph.(02143)253389, 257081, Email-gpraigad1@sancharnet.com
                </p>
                <p style={{ fontSize: "small" }}>Website : www.gppen.ac.in</p>
              </div>
            </div>
            <div className="dash"></div>
            <div className="body">
              <span id="RegNo"></span>
              <div className="title">
                <h2>BONAFIDE CERTIFICATE</h2>
              </div>
              <p className="date">
                <span>No.:GPP / Student Section /</span>
                <span>
                  Date: <span id="TodayDate"></span>
                </span>
              </p>
              <span>
                This is to certify that <span id="gender"></span>
                <span id="fullName"></span> Roll No. <span id="RollNo"></span>{" "}
                is a bonafide student of Government Polytechnic, Pen, Dist.
                Raigad. Studying in <span id="year"></span> year in
                <span id="branch"></span> Engineering Branch of the Year
                <span id="currentYear"></span>. <span id="HisHer"></span> date
                of Birth is <span id="DateofBirth"></span> as per office record.
                <br />
                This Certificate is issued on <span id="HisHer"></span> request
                application dated <span id="CurrentDate"></span>.{" "}
              </span>
              <br />
            </div>
            <div className="Signatures">
              <div className="clerk">
                <h3>
                  <br />
                  Student Section Clerk Sign.
                </h3>
              </div>
              <div className="principal">
                <h3>
                  Principal
                  <br />
                  Government Polytechnic, Pen
                </h3>
              </div>
            </div>
          </div>
        </div>

        <button onClick={PrintDoc()}> Print</button>

        <input
          type="button"
          value="Print Preview"
          className="btn"
          onClick={PrintPreview()}
        />

        <a href="./BonafideApplication">
          <button>Bonafide Application</button>
        </a>
      </div>
    </>
  );
}

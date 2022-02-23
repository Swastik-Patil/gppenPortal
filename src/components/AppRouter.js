import React from "react";
import "../style.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";

// AUTHENTICATION
import { useAuth } from "../contexts/AuthContext";
import Authenticate from "../pages/Authenticate";
import Profilepage from "../pages/Profilepage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import HomePage from "../pages/HomePage";
import PageNotFound from "../pages/PageNotFound";

// FUNCTIONALITIES
import StudentDetails from "../pages/StudentDetail";
import StudentLcDetails from "../pages/StudentLcDetails";

// BONAFIDE CERTIFICATE
import Bonafideportal from "./Bonafideportal";
import BonafideApplication from "../pages/Bonafide/BonafideApplication";
import TrackApplication from "../pages/TrackApplication";
import MyApplications from "../pages/MyApplications";

import HOD_Portal from "./HOD_Portal";
import HOD_Pending from "../pages/HOD/HOD_Pending";
import HOD_Rejected from "../pages/HOD/HOD_Rejected";
import HOD_Approved from "../pages/HOD/HOD_Approved";
import HODControlPanel from "../pages/HOD/HODControlPanel";

// LEAVING CERTIFICATE
import Lcportal from "./LcPortal";
import LCApplication from "../pages/LC/LCApplication";
import MyLcApplications from "../pages/LC/MyLcApplications";
import TrackLcApplication from "../pages/LC/TrackLcApplication";

import StudentSectionPortal from "./StudentSectionPortal";
import LC_Pending from "../pages/StudentSection/LC_Pending";
import LC_Rejected from "../pages/StudentSection/LC_Rejected";
import LC_Approved from "../pages/StudentSection/LC_Approved";
import StudentSectionControlPanel from "../pages/StudentSection/StudentSectionControlPanel";

export default function AppRouter(props) {
  return (
    <>
      <Router>
        <Switch>
          {/* AUTHENTICATION */}
          <ProtectedRoute exact path="/login" component={Authenticate} />
          <ProtectedRoute exact path="/register" component={Authenticate} />
          <ProtectedRoute exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/home" component={HomePage} />
          <ProtectedRoute exact path="/profile" component={Profilepage} />
          <ProtectedRoute
            exact
            path="/forgot-password"
            component={ForgotPasswordPage}
          />
          <ProtectedRoute
            exact
            path="/reset-password"
            component={ResetPasswordPage}
          />

          {/* FUNCTIONALITIES */}
          <ProtectedRoute exact path="/Details" component={StudentDetails} />
          <ProtectedRoute
            exact
            path="/bonafideportal"
            component={Bonafideportal}
          />
          <ProtectedRoute
            exact
            path="/LcDetails"
            component={StudentLcDetails}
          />

          {/* BONAFIDE CERTIFICATE */}

          <ProtectedRoute
            exact
            path="/bonafideapplication"
            component={BonafideApplication}
          />
          <ProtectedRoute
            exact
            path="/trackApplication"
            component={TrackApplication}
          />
          <ProtectedRoute path="/myApplications" component={MyApplications} />

          <ProtectedRoute exact path="/HODPortal" component={HOD_Portal} />
          <ProtectedRoute exact path="/HODPending" component={HOD_Pending} />
          <ProtectedRoute exact path="/HODRejected" component={HOD_Rejected} />
          <ProtectedRoute exact path="/HODApproved" component={HOD_Approved} />
          <ProtectedRoute
            exact
            path="/HODControlPanel"
            component={HODControlPanel}
          />

          {/* LEAVING CERTIFICATE */}
          <ProtectedRoute exact path="/lcPortal" component={Lcportal} />
          <ProtectedRoute
            exact
            path="/StudentSectionPortal"
            component={StudentSectionPortal}
          />
          <ProtectedRoute
            exact
            path="/lcapplication"
            component={LCApplication}
          />
          <ProtectedRoute
            exact
            path="/tracklcApplication"
            component={TrackLcApplication}
          />
          <ProtectedRoute
            path="/mylcApplications"
            component={MyLcApplications}
          />

          <ProtectedRoute exact path="/LcPending" component={LC_Pending} />
          <ProtectedRoute exact path="/LcRejected" component={LC_Rejected} />
          <ProtectedRoute exact path="/LcApproved" component={LC_Approved} />
          <ProtectedRoute
            exact
            path="/StudentSectionControlPanel"
            component={StudentSectionControlPanel}
          />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </>
  );
}

function ProtectedRoute(props) {
  const { currentUser } = useAuth();
  const { path } = props;
  const location = useLocation();
  if (
    path === "/login" ||
    path === "/register" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  ) {
    return currentUser ? (
      <Redirect to={location.state?.from ?? "/home"} />
    ) : (
      <Route {...props} />
    );
  }
  return currentUser ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: { from: path },
      }}
    />
  );
}

import React, { Component } from "react";
import { Route } from "react-router";
import DoctorSidebarTemplate from "../common/SidebarTemplate/DoctorSidebarTemplate";
import DoctorSpecialities from "../DoctorSpeciality/DoctorSpecialities";

export class DoctorDashboard extends Component {
  render() {
    return (
      <DoctorSidebarTemplate>
        <Route exact path="/doctor-dashboard">
          Doctor Dashboard Homepage
        </Route>
        <Route exact path="/doctor-dashboard/doctor-speciality">
          <DoctorSpecialities />
        </Route>
      </DoctorSidebarTemplate>
    );
  }
}

export default DoctorDashboard;

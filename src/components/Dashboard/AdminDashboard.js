import React, { Component } from "react";

import { Switch, Route, useLocation } from "react-router-dom";
import AdminSidebarTemplate from "../common/SidebarTemplate/AdminSidebarTemplate";
import DoctorSpecialities from "../DoctorSpeciality/DoctorSpecialities";

export class AdminDashboard extends Component {
  render() {
    return (
      <AdminSidebarTemplate>
        <div className="row justify-content-around mb-5">
          {/* <h1>Admin Dashboard</h1> */}

          <Route exact path="/admin-dashboard">
            Homepage
          </Route>

          <Route exact path="/admin-dashboard/doctor-speciality">
            <DoctorSpecialities />
          </Route>
        </div>
      </AdminSidebarTemplate>
    );
  }
}

export default AdminDashboard;

import React, { Component } from "react";
import {
  getDoctorSpecialities,
  getDoctorSpeciality,
  setMessage,
  addDoctorSpeciality,
  clearErrors,
} from "../../actions/adminActions";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class DoctorSpecialities extends Component {
  state = {
    feedback_msg: null,
    name: "",
    errors: {},
  };

  static getDerivedStateFromProps(props, state) {
    if (props.message.msg) {
      return {
        feedback_msg: props.message.msg,
      };
    }
    if (props.errors) {
      return {
        errors: props.errors,
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.getDoctorSpecialities();
    this.setState({
      name: "",
    });
  }
  componentWillUnmount() {
    this.props.setMessage(null);
    this.props.clearErrors();
  }

  addDoctorSpeciality = (e) => {
    e.preventDefault();
    if (this.state.name != null) {
      const doctorSpecialityData = {
        name: this.state.name,
      };
      this.props.addDoctorSpeciality(doctorSpecialityData, this.props.history);
      this.props.getDoctorSpecialities();
    }
  };

  searchDoctorSpeciality = (e) => {
    e.preventDefault();
    if (this.state.name != null) {
      this.props.getDoctorSpeciality(this.state.name);
    }
  };

  onChangeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    const { doctorSpeciality, doctorSpecialities, loading } = this.props.admin;

    let tableContent;
    if (loading === true && doctorSpecialities === null) {
      tableContent = (
        <div className="text-center">
          <Spinner />
        </div>
      );
    } else if (loading === false && doctorSpecialities === null) {
      tableContent = (
        <h1 className="display-4 text-danger">
          No Doctor Specialities Found :(
        </h1>
      );
    } else {
      let doctorSpecialitiesTable = doctorSpecialities.map(
        (doctorSpeciality) => {
          return (
            <tr key={doctorSpeciality.id}>
              <td className="text-uppercase">
                {doctorSpeciality.id.toUpperCase()}
              </td>
              <td className="text-uppercase">
                {doctorSpeciality.name.toUpperCase()}
              </td>
              <td>
                <button
                  disabled
                  className="btn btn-success btn-sm me-2"
                  onClick={() => this.onUpdateStudent(doctorSpeciality.id)}
                >
                  Update
                </button>
                <button
                  disabled
                  className="btn btn-danger btn-sm"
                  onClick={() => this.onDeleteStudent(doctorSpeciality.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        }
      );

      tableContent = (
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col text-uppercase">ID</th>
              <th scope="col text-uppercase">SPECIALITY NAME</th>
              <th scope="col text-uppercase">Action</th>
            </tr>
          </thead>
          <tbody>{doctorSpecialitiesTable}</tbody>
        </table>
      );
    }
    return (
      <div className="mt-2">
        {this.state.feedback_msg ? (
          <div
            className={`alert alert-${this.state.feedback_msg.type} alert-dismissible fade show mt-3`}
            role="alert"
          >
            <strong>{this.state.feedback_msg.content}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
        <button
          className="btn btn-primary float-start"
          data-bs-toggle="modal"
          data-bs-target="#doctorSpeciality"
        >
          <i className="fas fa-plus"></i> Add New Doctor Speciality
        </button>
        <form className="float-start ms-4" method="GET">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Speciality Name"
              aria-label="Enter Speciality Name"
              aria-describedby="buttonDocSpeciality"
            />
            <button
              className="btn btn-success"
              type="button"
              id="buttonDocSpeciality"
            >
              Search
            </button>
          </div>
        </form>
        {/* Add Doctor Speciality Modal */}
        <div
          className="modal fade"
          id="doctorSpeciality"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="doctorSpecialityLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="doctorSpecialityLabel">
                  Add Doctor Speciality
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form method="POST">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className={classnames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      id="name"
                      name="name"
                      placeholder="Name"
                      onChange={this.onChangeHandler}
                    />
                    <div className="invalid-feedback">
                      <strong>{errors.name}</strong>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancle
                </button>
                <button
                  disabled={this.state.name.length === 0}
                  type="btn btn-primary px-4"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={this.addDoctorSpeciality}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Search Doctor Speciality Modal */}

        <br />
        <div className="mt-5">{tableContent}</div>
      </div>
    );
  }
}

DoctorSpecialities.propTypes = {
  admin: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
  getDoctorSpecialities: PropTypes.func.isRequired,
  getDoctorSpeciality: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
  message: state.message,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getDoctorSpecialities,
  getDoctorSpeciality,
  setMessage,
  clearErrors,
  addDoctorSpeciality,
})(DoctorSpecialities);

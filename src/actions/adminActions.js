import axios from "axios";
import {
  GET_ADMIN,
  GET_DOCTOR_SPECIALITIES,
  GET_DOCTOR_SPECIALITY,
  GET_ERRORS,
  SET_LOADING,
  SET_MESSAGE,
} from "./types";
import jwt_decode from "jwt-decode";
import setAdminToken from "../utils/setAdminToken";

export const loginAdmin = (adminData) => (dispatch) => {
  axios
    .post("/api/admins/login", adminData)
    .then((res) => {
      // fetch the jwt token from the backend
      const { token } = res.data;
      // store the token in the local storage
      localStorage.setItem("jwtToken", token);
      // set the token to the authorization header (the one that you find in postman)
      setAdminToken(token);
      // decode the jwt token to get admin data
      const decoded = jwt_decode(token);
      // send the decoded data to a reducer to use the admin in our components
      dispatch(getAdmin(decoded));
    })
    .catch((err) => {
      console.log("err:", err);

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getAdmin = (adminInfo) => {
  return {
    type: GET_ADMIN,
    payload: adminInfo,
  };
};

export const logoutAdmin = () => (dispatch) => {
  // Clear Errors
  dispatch(clearErrors());
  // remove the token from the local storage
  localStorage.removeItem("jwtToken");
  // delete the authorization header
  setAdminToken(false);
  // remove the admin by setting isAuthenticated to false by sending an empty payload
  dispatch(getAdmin({}));
};

export const getDoctorSpecialities = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/api/admin/doctor-speciality", {
      // headers: {
      //   "Content-Type": "application/json;charset=UTF-8",
      //   "Access-Control-Allow-Origin": "*",
      //   Accept: "application/json",
      // },
      data: {},
    })
    .then((res) => {
      // fetch all doctor speciality from backend
      dispatch({
        type: GET_DOCTOR_SPECIALITIES,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("err:", err);

      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getDoctorSpeciality = (name) => (dispatch) => {
  dispatch(setLoading());
  axios
    .get(`/api/admin/doctor-speciality/${name}`)
    .then((res) => {
      dispatch({
        type: GET_DOCTOR_SPECIALITY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addDoctorSpeciality = (doctorSpecialityData, history) => (
  dispatch
) => {
  axios
    .post("/api/admin/doctor-speciality", doctorSpecialityData)
    .then(() => {
      const msg = {
        content: "Doctor Speciality Added Successfully",
        type: "success",
      };
      dispatch(setMessage(msg));
      // history.push("/students");
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const setMessage = (msg) => {
  return {
    type: SET_MESSAGE,
    payload: msg,
  };
};

export const clearErrors = () => {
  return {
    type: GET_ERRORS,
    payload: {},
  };
};

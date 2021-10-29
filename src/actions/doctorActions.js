import axios from "axios";
import {
  GET_ADMIN,
  GET_DOCTOR_SPECIALITIES,
  GET_DOCTOR_SPECIALITY,
  GET_ERRORS,
  SET_LOADING,
  SET_MESSAGE,
} from "./types";

export const getDoctorSpecialities = () => (dispatch) => {
  dispatch(setLoading());
  axios
    .get("/api/doctor/doctor-speciality", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
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

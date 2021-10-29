import {
  GET_ADMIN,
  GET_DOCTOR_SPECIALITIES,
  GET_DOCTOR_SPECIALITY,
  SET_LOADING,
} from "../actions/types";
import IsEmpty from "../validations/IsEmpty";

const initialState = {
  isAuthenticated: false,
  admin: {},
  doctorSpecialities: null,
  doctorSpeciality: null,
  loading: false,
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        isAuthenticated: !IsEmpty(action.payload),
        admin: action.payload,
      };
    case GET_DOCTOR_SPECIALITIES:
      return {
        ...state,
        doctorSpecialities: action.payload,
        loading: false,
      };
    case GET_DOCTOR_SPECIALITY:
      return {
        ...state,
        doctorSpeciality: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default adminReducer;

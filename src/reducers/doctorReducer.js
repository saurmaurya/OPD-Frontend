import { GET_DOCTOR_SPECIALITIES, SET_LOADING } from "../actions/types";
import IsEmpty from "../validations/IsEmpty";

const initialState = {
  //   isAuthenticated: false,
  doctorSpecialities: null,
  loading: false,
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCTOR_SPECIALITIES:
      return {
        ...state,
        doctorSpecialities: action.payload,
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

export default doctorReducer;

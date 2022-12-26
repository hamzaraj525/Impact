const initialState = {
  userId: '',
  userRemoveId: '',
  signUpKey: '',
  userPersonalDetailsVerify: false,
  vehicleDetailsVerify: false,
  insuranceDetailsVerify: false,
};
export const regReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_ID':
      return {
        ...state,
        userId: action.userId,
      };
    case 'REMOVE_USER_ID':
      return {
        ...state,
        userId: null,
      };
    case 'USER_SIGNUP_KEY':
      return {
        ...state,
        signUpKey: action.signUpKey,
      };
    case 'USER_PERSONAL_DETAILS_VERIFY':
      return {
        ...state,
        userPersonalDetailsVerify: action.userPersonalDetailsVerify,
      };
    case 'VEHICLE_DETAILS_VERIFY':
      return {
        ...state,
        vehicleDetailsVerify: action.vehicleDetailsVerify,
      };
    case 'INSURANCE_DETAILS_VERIFY':
      return {
        ...state,
        insuranceDetailsVerify: action.insuranceDetailsVerify,
      };
  }
  return state;
};
export default regReducer;

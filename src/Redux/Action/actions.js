export const addUserid = userId => {
  // console.log('user Id redux' + userId);
  return {
    type: 'ADD_USER_ID',
    userId: userId,
  };
};
export const removeUserId = userRemoveId => {
  console.log('user remove Id redux' + userRemoveId);
  return {
    type: 'REMOVE_USER_ID',
    userRemoveId: userRemoveId,
  };
};
export const userSignUpKey = signUpKey => {
  console.log('signUp Key redux------' + signUpKey);
  return {
    type: 'USER_SIGNUP_KEY',
    signUpKey: signUpKey,
  };
};
export const userPersoanlVerify = userPersonalDetailsVerify => {
  console.log(
    'userPersonalDetailsVerify redux------' + userPersonalDetailsVerify,
  );
  return {
    type: 'USER_PERSONAL_DETAILS_VERIFY',
    userPersonalDetailsVerify: userPersonalDetailsVerify,
  };
};
export const vehicleVerify = vehicleDetailsVerify => {
  console.log('vehicleDetailsVerify redux------' + vehicleDetailsVerify);
  return {
    type: 'VEHICLE_DETAILS_VERIFY',
    vehicleDetailsVerify: vehicleDetailsVerify,
  };
};
export const insuranceVerify = insuranceDetailsVerify => {
  console.log('insuranceDetailsVerify redux------' + insuranceDetailsVerify);
  return {
    type: 'INSURANCE_DETAILS_VERIFY',
    insuranceDetailsVerify: insuranceDetailsVerify,
  };
};

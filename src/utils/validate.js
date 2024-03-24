/** @format */

export const checkValidData = (email, password) => {
  const isEmailValid =
    /^([A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,})$/.test(email);
  // const isPassValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/.test(password);
  const isPassValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-+.]).{6,20}$/;
  if (!isEmailValid) return "Email ID is not valid";
  if (!isPassValid) return "Password is not valid";

  return null;
};

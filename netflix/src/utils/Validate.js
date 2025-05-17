export const validateUserData = (email, password) => {
  const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  if (!isEmailValid) {
    return "Email is not valid";
  }

  if (!isPasswordValid) {
    return "Password must be at least 8 characters and include uppercase, lowercase, and numbers";
  }

  return ""; // ✅ empty string means no error
};

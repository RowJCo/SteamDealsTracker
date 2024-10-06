"use server";

export const signUp = async function (prevState, formData) {
  //stores erros in an object
  const errors = {};
  //stores the user object
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  //checks if the email and password are strings to prevent sql injection
  if (typeof user.email !== "string") {
    user.email = "";
  }
  if (typeof user.password !== "string") {
    user.password = "";
  }
  //remove whitespace from email and password
  user.email = user.email.trim();
  user.password = user.password.trim();
  //checks if the email is an email
  if (!user.email.includes("@")) {
    errors.email = "Email must be an email";
  }
  //checks if email is empty
  if (user.email === "") {
    errors.email = "Email is required";
  }
  //checks if password is empty
  if (user.password === "") {
    errors.password = "Password is required";
  }
  //checks the length of the password
  if (user.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  //checks if there are any errors
  if (errors.email || errors.password) {
    return { errors, success: false };
  }
  //stores the user object in the database

  //log the user via cookie

  //return the user object
  return { user, success: true };
};

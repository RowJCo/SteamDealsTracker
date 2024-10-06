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
};

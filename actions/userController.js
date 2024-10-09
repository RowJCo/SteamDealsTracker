"use server";

import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import {
  connectEditDb,
  connectReadDb,
  closeDb,
  runQueryWithRetry,
} from "../lib/db";

export const signIn = async function (prevState, formData) {
  //stores errors in an object
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
  //checks if there are any errors
  if (errors.email || errors.password) {
    return { errors, success: false };
  }
  //search for email in the database
  let db = await connectReadDb();
  const query = "SELECT * FROM users WHERE email = ?";
  const userExists = await runQueryWithRetry(db, query, [user.email]);
  console.log(userExists);
  //close the database connection
  await closeDb(db);
  //checks if the email exists
  if (!userExists.length) {
    errors.overall = "Sign up details are incorrect";
    return { errors, success: false };
  }
  //checks if the password is correct
  const passwordMatch = await bcrypt.compare(
    user.password,
    userExists[0].password
  );
  if (!passwordMatch) {
    errors.overall = "Sign up details are incorrect";
    return { errors, success: false };
  }
  //create jwt token
  const token = jwt.sign(
    { email: user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET
  );
  //log the user via cookie
  cookies().set("SteamDealsTracker", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60,
  });
  //redirect to the home page
  return redirect("/");
};

//signs up the user
export const signUp = async function (prevState, formData) {
  //stores errors in an object
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
  //checks if the email is already in the database
  let db = await connectReadDb();
  let query = "SELECT * FROM users WHERE email = ?";
  const userExists = await runQueryWithRetry(db, query, [user.email]);
  //close the database connection
  await closeDb(db);
  if (userExists.length) {
    errors.email = "Email already in use";
  }
  //checks if there are any errors
  if (errors.email || errors.password) {
    return { errors, success: false };
  }
  //hashes the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  //stores the user object in the database
  db = await connectEditDb();
  query = "INSERT INTO users (email, password) VALUES (?, ?)";
  await runQueryWithRetry(db, query, [user.email, user.password]);
  //close the database connection
  await closeDb(db);
  //create jwt token
  const token = jwt.sign(
    { email: user.email, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWT_SECRET
  );
  //log the user via cookie
  cookies().set("SteamDealsTracker", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60,
  });
  //redirect to the home page
  return redirect("/");
};

//signs out the user
export const signOut = async function () {
  //clear the cookie
  cookies().delete("SteamDealsTracker");
  redirect("/");
};

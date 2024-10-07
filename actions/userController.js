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

//signs up the user
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
  //hashes the password
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  //stores the user object in the database
  let db = await connectEditDb();
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
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
  errors.success =
    "Account created - head to the home page to start adding games";
  //return the user object
  return { email: user.email, errors, success: true };
};

//signs out the user
export const signOut = async function () {
  //clear the cookie
  cookies().delete("SteamDealsTracker");
  redirect("/");
};

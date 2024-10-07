import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const getCookieData = async function () {
  //get the cookie from the request
  const cookie = cookies().get("SteamDealsTracker")?.value;
  //checks if the cookie exists
  if (cookie) {
    try {
      //verify the cookie
      const decoded = jwt.verify(cookie, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  }
};

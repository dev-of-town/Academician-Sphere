import axios from "axios";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  console.log("---------------------------------------------------");
  const token = request.cookies.get("access_token");
  if(token){
      try {
        const { _id } = jwt.verify(token, "THISISOURSECRET");
        const { data } = await axios.get(`http://localhost:4040/user?_id=${_id}`);
        const res = NextResponse.json(data);
        return res;
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
  }else{
    return NextResponse.redirect(new URL("/login",request.nextUrl));
  }
  return NextResponse.json({ message: "Hi" });
}

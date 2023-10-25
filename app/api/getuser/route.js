import { readCookie } from "@/app/actions";
import axios from "axios";
import jwt from "jsonwebtoken";
import { redirect } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  // console.log("---------------------------------------------------");
  const token = request.cookies.get("access_token")
  if(token){
      try {
        // console.log(token);
        const decode = jwt.verify(token.value.toString(), "THISISOURSECRET");
        // console.log(decode);
        const { data } = await axios.post(`http://localhost:4041/u/${decode._id}`,{user_id:decode._id});
        // console.log(data);
        const res = NextResponse.json(data);
        // console.log(data);
        return res;
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
  }
    return NextResponse.redirect(new URL("/login",request.nextUrl));
}

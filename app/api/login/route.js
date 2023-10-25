import { getToken } from "@/app/assets/Authorisation";
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Hola");
    console.log(request);
    const response = await request.json();
    const user = response;
    console.log(user);
    const { data } = await axios.post("http://localhost:4041/login", user, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { user:userData } = data;
    console.log(data);
    const res = NextResponse.json(data);
    if(data.success){
      let {username,_id,mail} = userData;
      const token = getToken({username,_id,mail});
      console.log(1);
      res.cookies.set("access_token", token, {
        httpOnly: true,
      });
    }
    console.log(3);

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

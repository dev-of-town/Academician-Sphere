import { getToken } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const user = { username, email, password };
    console.log(user);
    const { data } = await axios.post("http://localhost:4041/signup", user, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const res = NextResponse.json(data);
    if (data.success) {
      let { username, _id, mail } = data.user;
      const token = getToken({ username, _id, mail });
      console.log(1);
      res.cookies.set("access_token", token, {
        httpOnly: true,
      });
    }

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const isAuthenticated = (token) => {};

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  console.log(request.cookies);
  let token = request.cookies.get("connect.sid");   
  try {
    console.log("Helloeoeoejionibguaebfiuoaw");
    const data = await fetch("http://localhost:4041/login", {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        //   "Content-Type": "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials:'include'
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
  console.log(token);

  if (path !== "/login" && path !== "/signup") {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  if (path === "/login" || path === "/signup") {
    if (token) {
      // const {_id} = jwt.verify(token,'THISISOURSECRET');

      // const {data} = await axios.get(`http://localhost:4040/user?_id=${_id}`);
      // const res = NextResponse.json(data);
      const res = NextResponse;

      return res.redirect(new URL("/", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/create-community"],
};

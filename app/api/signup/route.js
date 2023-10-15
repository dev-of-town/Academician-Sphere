import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();
    const user = { username, email, password };
    console.log(user);
    const {data} = await axios.post("http://localhost:4040/signup", user, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return NextResponse.json(data);
} catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

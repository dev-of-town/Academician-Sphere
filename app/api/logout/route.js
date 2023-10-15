import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = NextResponse.json(data);
    res.cookies.set("access_token", data.token, {
      httpOnly: true,
      expires: new Date(0),
    });

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

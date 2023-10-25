import { readCookie } from "@/app/actions";
import { getId } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {
    const id = request.url.slice(request.url.lastIndexOf("/") + 1);
    console.log(id, "---------------------------------------------------");
    const token = request.cookies.get("access_token");
    const user_id = getId(token.value.toString());

    const { data } = await axios.post(`http://localhost:4041/u/${id}`,{user_id});
    console.log(data);
    const res = NextResponse.json(data);
    console.log(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

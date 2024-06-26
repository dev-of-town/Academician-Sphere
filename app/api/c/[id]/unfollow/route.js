import { readCookie } from "@/app/actions";
import { getUsername } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request,context) {
  try {
    // console.log(context.param);
    const {id} = context.params;
    console.log(id, "---------------------------------------------------");
    const token = request.cookies.get("access_token");
    console.log(request.cookies);
    const username = getUsername(token.value.toString());

    const { data } = await axios.post(`http://localhost:4041/c/${id}/unfollow`,{username});
    console.log(data);
    const res = NextResponse.json(data);
    console.log(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

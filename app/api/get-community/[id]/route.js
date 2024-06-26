import { readCookie } from "@/app/actions";
import { getId, getUsername } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request,context) {
    console.log("-------------------------------------THIS IS GET COM / ID------------------------------------------------");
  try {
    // console.log(request,"This is Request>-----------------<");
    const {id} = context.params;
    const {username} = await request.json();
    console.log(username, "---------------------------------------------------");

    const { data } = await axios.post(`http://localhost:4041/c/${id}/get-community-data`,{username});
    // console.log(data);
    const res = NextResponse.json(data);
    console.log(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

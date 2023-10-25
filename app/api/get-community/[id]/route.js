import { getId } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest,NextResponse } from "next/server";

export async function POST(request) {
    console.log("-------------------------------------THIS IS GET COM / ID------------------------------------------------");
  try {
    // console.log(request,"This is Request>-----------------<");
    const id = request.url.slice(request.url.lastIndexOf("/") + 1);
    // console.log(id, "---------------------------------------------------");
    const user_id = await request.json();
    const { data } = await axios.post(`http://localhost:4041/c/${id}/get-community-data`,user_id);
    // console.log(data);
    const res = NextResponse.json(data);
    console.log(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

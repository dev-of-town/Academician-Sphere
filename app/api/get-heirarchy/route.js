import { readCookie } from "@/app/actions";
import { getId, getUsername } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request,context) {
    try {
        console.log(request.url);
        const token = request.cookies.get("access_token");
        const user_id = getId(token.value.toString());
    
        const { data } = await axios.get(`http://localhost:4041/u/${user_id}/get-all-heirarchy`);
        console.log(data);
        const res = NextResponse.json(data);
        console.log(data);
        return res;
      } catch (error) {
        console.log(error);
        return NextResponse.json(error);
      }
}

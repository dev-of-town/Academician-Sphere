import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
        // console.log("Hola");
      const response = await request.json();
    //   const user = response;
      console.log(response);
    return NextResponse.json({message:"successful",status:200,success:true});
} catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

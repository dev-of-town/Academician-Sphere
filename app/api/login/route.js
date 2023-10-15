import axios from "axios";
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
        console.log("Hola");
      const response = await request.json();
      const user = response;
      console.log(user);
    const {data} = await axios.post("http://localhost:4040/login", user, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(data);
    const {username,mail,_id} = data; 
    const token = jwt.sign({_id,username,mail}, 'THISISOURSECRET', {
        expiresIn: "30d",
    });
    const res = NextResponse.json(data);
    if(data.status===200){
        res.cookies.set("access_token",token,{
            httpOnly:true,expires:'30d'
        });
    }

    return res;
} catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const isAuthenticated=(token)=>{

} 

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    let token = request.cookies.get("access_token");
    
    if(path!=='/login' && path!=='/signup'){
        if(!token){
            return NextResponse.redirect(new URL('/login',request.nextUrl));
        }
    }

    if(path==='/login' || path==='/signup'){
        
        if(token){
            // const {_id} = jwt.verify(token,'THISISOURSECRET');

            // const {data} = await axios.get(`http://localhost:4040/user?_id=${_id}`);
            // const res = NextResponse.json(data);
            const res = NextResponse;

            return res.redirect(new URL('/',request.nextUrl))
        }

    }
}


export const config = {
    matcher: ['/','/login','/signup']
}
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    const path = request.nextUrl.pathname;
    if(path==='/login' || path==='/signup'){
        let token = request.cookies.get("access_token");
        if(token){
            //send the user
            return NextResponse.redirect(new URL('/',request.nextUrl))
        }
    }
}


export const config = {
    matcher: ['/','/login','/signup']
}
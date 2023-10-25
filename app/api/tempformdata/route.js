import { getId, getToken } from "@/app/assets/Authorisation";
import axios from "axios";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("Hola");
    let formData = await request.formData();
    console.log(formData);
    let json = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
    let token = request.cookies.get("access_token");   
    let createdBy = getId(token.value.toString());
    console.log(json);
    json = {...json,createdBy};
    formData.set("json",JSON.stringify(json));
    console.log(formData);
    // formData.set("jbson",json);
    // console.log(formData);
    const data = await (await fetch("http://localhost:4041/c/new_community", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formData, // body data type must match "Content-Type" header
    })).json();
    // const response = await request.json();

    const res = NextResponse.json({success:true});
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

import { getId } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    let formData = await request.formData();
    console.log("New Community  ",formData);
    let token = request.cookies.get("access_token");   
    let createdBy = getId(token.value.toString());
    let {json} = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
    json = JSON.parse(json);
    console.log(json);
    json = {...json,createdBy};
    formData.set("json",JSON.stringify(json));
    console.log(formData);
    const data = await (
      await fetch("http://localhost:4041/c/new_community", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formData, // body data type must match "Content-Type" header
      })
    ).json();

    console.log(data);

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

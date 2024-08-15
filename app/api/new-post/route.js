// import API from "@/app/(app)/(main)/create-post/_components/Axios";
import { getId, getToken } from "@/app/assets/Authorisation";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    let formData = await request.formData();
    console.log("This is my form data",formData);
    let {json:jsObj} = JSON.parse(JSON.stringify(Object.fromEntries(formData)));
    jsObj = JSON.parse(jsObj);
    let token = request.cookies.get("access_token"); 
    console.log("THis is i si i oasfnaweijfn",token);
    const sender_id = getId(token.value.toString());
    console.log(sender_id);
    console.log(jsObj,sender_id);
    jsObj = {...jsObj,sender_id};
    formData.set("json",JSON.stringify(jsObj));
    console.log(formData);

    const response = await fetch("http://localhost:4041/new-post", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formData, // body data type must match "Content-Type" header
    });

    console.log("Error Prone");
    console.log(response);
    
    const data = await response.json();
    

    console.log(data);
    // const { data } = await axios.post("http://localhost:4041/new-post", post, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    // });
    const res = NextResponse.json(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

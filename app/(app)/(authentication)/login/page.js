"use client";

import React, { useContext, useEffect, useState } from "react";
import styles from "../_css/authentication.module.css";
import TheBtn from "../_components/TheBtn";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import useUser, { UserContext } from "@/app/_contexts/UserContext";

const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const LoginPage = () => {
  const {user,setUser} = useContext(UserContext);
  const router = useRouter();
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onLogin = async () => {
    try {
      const {data} = await axios.post(`/api/login`, userCred);
      if(data.status===200){
        console.log(data.user);
        setUser(data.user);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(()=>{
  //   axios.get("http://localhost:4040/login",{withCredentials:true}).then((response)=>{
  //     if(response.status===200){
  //       router.push("/");
  //     }
  //   }).catch((error)=>{
  //     console.log(error);
  //   });
  // },[]);

  useEffect(() => {
    if (userCred.email.length > 0 && userCred.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [userCred]);

  return (
    <div className={styles["innerDiv"]}>
      <h1 className={styles["title"]}>LOGIN</h1>
      <div className={styles["loginFormGrid"]}>
        <div
          className={`${styles["loginFormColumn"]} ${styles["login"]} ${styles["student"]} ${styles["teacher"]} ${styles["other"]}`}
        >
          <div>
            <label htmlFor="email">
              <p>Email address</p>
            </label>
            <input
              type="email"
              className={styles["email"]}
              name="email"
              onChange={(e) => setUserCred({ ...userCred, email: e.target.value })}
            />
            <label>
              <p>Password</p>
            </label>
            <input
              type="password"
              styles={styles["password"]}
              name="password"
              onChange={(e) => setUserCred({ ...userCred, password: e.target.value })}
            />
            <p>
              <a href="#" className={styles["showPassword"]}>
                Show Password
              </a>
            </p>
            <p>
              <Link
                href="/forgot-password"
                className={styles["forgotPassword"]}
              >
                Forgot Password ?
              </Link>
            </p>
            <button
              disabled={isButtonDisabled}
              onClick={onLogin}
              style={
                isButtonDisabled
                  ? { opacity: 0.5, cursor: "default" }
                  : { opacity: 1, cursor: "pointer" }
              }
            >
              Login
            </button>
            <p>
              New User? <Link href="/signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

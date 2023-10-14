"use client";

import React, { useEffect, useState } from "react";
import styles from "../_css/authentication.module.css";
import TheBtn from "../_components/TheBtn";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const onLogin = async () => {
    try {
      const { data } = await axios.post(`http://localhost:4040/login`, user, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      console.log(data);
      if (data.status === 208) {
        router.push("/");
      } else if (data.status===408) {
        router.push("/login");
      } else if(data.status===407){
        router.push("/signup");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(user);
    if (user.email.length > 0 && user.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user]);

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
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label>
              <p>Password</p>
            </label>
            <input
              type="password"
              styles={styles["password"]}
              name="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
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

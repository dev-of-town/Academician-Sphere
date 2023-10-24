"use client";

import React, { useEffect, useState } from "react";
import styles from "../_css/authentication.module.css";
import TheBtn from "../_components/TheBtn";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/app/_contexts/UserContext";

const pCheck1 = /.{8,}/;
const pCheck2 = /[A-Z]/;
const pCheck3 = /[0-9]/;
const pCheck4 = /\W/;
const emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const SignupPage = () => {
  // to check password

  //to validate email

  const router = useRouter();
  const {user:loginUser,setUser:setLoginUser} = useUser();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isPassMatched, setIsPassMatched] = useState(false);
  const [isEmailOkay, setIsEmailOkay] = useState(false);
  const [isPassOkay, setIsPassOkay] = useState(false);
  const [isUsernameOkay, setIsUsernameOkay] = useState(true);
  const [stylePassError, setStylePassError] = useState([
    { color: "red" },
    { color: "red" },
    { color: "red" },
    { color: "red" },
  ]);

  const validateEmail = () => {
    // console.log("VALIDATE MAIL",user);
    setIsEmailOkay(emailValidation.test(user.email));
    return isEmailOkay;
  };

  const matchPassword = () => {
    // console.log("match pass",user);
    setIsPassMatched(user.password === user.confirmPassword);
    return isPassMatched;
  };

  const validatePassword = () => {
    // console.log("validate pass",user);
    let styl = [
      { color: "red" },
      { color: "red" },
      { color: "red" },
      { color: "red" },
    ];
    let isAllOkay = true;
    if (pCheck1.test(user.password)) {
      styl[0].color = "green";
    } else {
      isAllOkay = false;
    }
    if (pCheck2.test(user.password)) {
      styl[1].color = "green";
    } else {
      isAllOkay = false;
    }
    if (pCheck3.test(user.password)) {
      styl[2].color = "green";
    } else {
      isAllOkay = false;
    }
    if (pCheck4.test(user.password)) {
      styl[3].color = "green";
    } else {
      isAllOkay = false;
    }

    setIsPassOkay(isAllOkay);
    setStylePassError(styl);
    return isPassOkay;
  };

  useEffect(() => {
    validateEmail();
    validatePassword();
    matchPassword();

    // console.log(isButtonDisabled, isEmailOkay, isPassMatched, isPassOkay, user);
  }, [user]);

  const onSignup = async () => {
    console.log("Sign up", user);
    // if (isEmailOkay && isPassOkay && isPassMatched) {
    // console.log(user);
    try {
      delete user.confirmPassword;
      const { data } = await axios.post(`/api/signup`, user);
      // const { data } = await axios.post(`/api/signup`, user, {
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   withCredentials:true,
        
      // });
      console.log(data,"Beforre Signup");
      if (data.status === 409) {
        setIsUsernameOkay(false);
      } else if (data.status === 200) {
        // setLoginUser(data.user);
        console.log(data.user,"In signup");
        router.push(`/u/${data.user._id}`);
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4040/login", { withCredentials: true })
  //     .then((response) => {
  //       if (response.status === 200) {
  //         router.push("/");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className={styles["innerDiv"]}>
      <h1 className={styles["title"]}>REGISTER</h1>
      <div className={styles["loginFormGrid"]}>
        <div className={styles["loginFormColumn"]}>
          <label>
            <p>Email address</p>
          </label>
          <input
            type="email"
            className={styles["email"]}
            name="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            style={{
              outline:
                user.email.length > 0
                  ? `2px solid ${isEmailOkay ? "green" : "red"}`
                  : 0,
            }}
          />
        </div>
        <div className={styles["loginFormColumn"]}>
          <label>
            <p>Create your username</p>
          </label>
          <input
            type="text"
            className={styles["username"]}
            name="username"
            value={user.username}
            onChange={(e) => {
              setUser({ ...user, username: e.target.value });
            }}
            style={{}}
          />
          <p
            className={`${styles["usernameAvailability"]} ${styles["passwordGuide"]}`}
            style={{}}
          >
            {user.username.length > 0 &&
              !isUsernameOkay &&
              "username already taken"}
          </p>
        </div>
        <div className={styles["loginFormColumn"]}>
          <label>
            <p>Password</p>
          </label>
          <input
            type="password"
            className={styles["password"]}
            name="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <p
            className={styles["passwordGuide"]}
            style={{ color: isPassOkay ? "green" : "" }}
          >
            Your password must contain :
          </p>
          <ul className={styles["passwordGuide"]}>
            <li style={stylePassError[0]}>
              <p className={styles["eightStatus"]}>
                <b>Atleast 8 characters</b>
              </p>
            </li>
            <li style={stylePassError[1]}>
              <p className={styles["capStatus"]}>
                <b>Atleast 1 capital letter</b>
              </p>
            </li>
            <li style={stylePassError[2]}>
              <p className={styles["digitStatus"]}>
                <b>Atleast 1 digit</b>
              </p>
            </li>
            <li style={stylePassError[3]}>
              <p className={styles["spcStatus"]}>
                <b>Atleast 1 special character</b>
              </p>
            </li>
          </ul>
        </div>
        <div className={styles["loginFormColumn"]}>
          <label>
            <p>Re-enter Password</p>
          </label>
          <input
            type="password"
            className={styles["password2"]}
            name="password2"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <p
            className={`${styles["password2Status"]} ${styles["passwordGuide"]}`}
            style={{ color: isPassMatched ? "green" : "red" }}
          >
            {user.password.length > 0 &&
              (isPassMatched ? "Password Matched" : "Password does not match")}
          </p>
          <p>
            <a href="#" className={styles["showPassword"]}>
              Show Password
            </a>
          </p>
        </div>
        <div className={styles["loginFormColumn"]}>
          <button
            disabled={isButtonDisabled}
            className={
              isButtonDisabled ? styles.btnDisabled : styles.btnEnabled
            }
            onClick={onSignup}
          >
            Sign Up
          </button>
        </div>
        <div className={styles["loginFormColumn"]}>
          <p>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

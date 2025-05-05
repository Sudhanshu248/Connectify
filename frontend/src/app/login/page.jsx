"use client";

import UserLayout from "../../layout/UserLayout/index";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./style.module.css";
import { loginUser, registerUser, getAboutUser } from "../../config/redux/action/authAction";
import { emptyMessage } from "../../config/redux/reducer/authReducer";

export default function LoginComponent() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
 
  const [userLoginMethod, setUserLoginMethod] = useState(false);
  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if(authState.loggedIn){
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  useEffect(() => {
    dispatch(emptyMessage());
  }, [userLoginMethod, dispatch]);

  useEffect(() => {
    if(authState.loggedIn){
      const token = localStorage.getItem("token");
      if(token){
        dispatch(getAboutUser({ token }));
      }
    }
  }, [authState.loggedIn, dispatch]);

  const handleRegister = () => {
    dispatch(registerUser({username, password, email, name}));
  };

  const handleLogin = () => { 
    dispatch(loginUser({email, password}));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>
            <p className={styles.cardLeft_heading}>{userLoginMethod ? "Sign In" : "Sign Up"}</p>

            <p style={{color: authState.isError ? "red" : "green"}}>{authState.message}</p>

            <div className={styles.inputContainers}>

              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <input onChange={(e) => setUsername(e.target.value)} className={styles.inputField} type="text" placeholder="Username" />
                  <input onChange={(e) => setName(e.target.value)} className={styles.inputField} type="text" placeholder="Name" />
                </div>
              )}

              <input onChange={(e) => setEmailAddress(e.target.value)} className={styles.inputField} type="text" placeholder="Email" />
              <input onChange={(e) => setPassword(e.target.value)} className={styles.inputField} type="password" placeholder="Password" />

              <div onClick={() => {
                if (userLoginMethod) {
                  handleLogin();
                } else {
                  handleRegister();
                }
              }} className={styles.buttonWithoutline}>
                <p>{userLoginMethod ? "Sign In" : "Sign Up"}</p>
              </div>

            </div>
            
          </div>

          <div className={styles.cardContainer_right}>
              {userLoginMethod ? <p className={styles.para}>Don't Have an Account?</p> : <p className={styles.para}>Already Have an Account?</p>}
                <div onClick={() => {
                  setUserLoginMethod(!userLoginMethod)
                }} style={{textAlign: "center"}} className={styles.buttonWithoutline} id={styles.button}>
                  <p className={styles.button}>{userLoginMethod ? "Sign Up" : "Sign In"}</p>
                </div>
          </div>

        </div>
      </div>
    </UserLayout>
  );
}
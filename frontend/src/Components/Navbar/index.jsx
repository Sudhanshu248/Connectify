"use client";

import React, {useEffect} from "react";
import styles from "./style.module.css"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reset } from "@/config/redux/reducer/authReducer";
import { getAboutUser } from "@/config/redux/action/authAction";
import { BASE_URL } from "@/config/axiosConfig";



export default function NavbarComponent(){
    const router = useRouter();
    const authState = useSelector((state) => state.auth);
    const { loggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
 
    // useEffect(() => {
    //     if(loggedIn){
    //         router.push("/dashboard");
    //     }
    // }, [loggedIn, router]);

    return(
        <div className={styles.container}>
            <div className={styles.navBar}>
             <img src="/logo.png" alt="logo.png" className={styles.logo}  onClick={() => {router.push("/")}} /> 

                <div className={styles.navBarOptionContainer}>

                    {authState.profileFetched  && 
                    <div>
                        <div style={{display: "flex", gap: "1.2rem"}}>
                        {/* <p>Hey, {authState.user?.userId.name }</p>  */}
                        
                        <p
    onClick={() => {
        console.log("Navigating to /profile");
        router.push("/profile");
    }}
    style={{ fontWeight: "bold", cursor: "pointer" }}
>
    Profile
</p>

                        
                        <p onClick={() => {
                            localStorage.removeItem("token")
                            router.push("/login")
                            dispatch(reset())
                        }} style={{fontWeight: "bold", cursor: "pointer"}}>Logout</p>

                        </div>
                    </div>
                    }

                    {!authState.profileFetched && 
                    <div onClick={() => {router.push("/login", { scroll: false })}} className={styles.buttonJoin}>
                        <p>Be a part</p>
                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}




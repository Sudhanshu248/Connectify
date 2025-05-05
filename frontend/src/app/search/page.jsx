"use client";

import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "@/config/redux/action/postAction";
import { getAllUsers } from "@/config/redux/action/authAction";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config/axiosConfig";
import styles from "./style.module.css";

export default function DiscoverPage() {

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!authState.all_profiles_fetched){
            dispatch(getAllUsers());
        }
    }, [])

    console.log("Current auth state:", {
        all_profiles_fetched: authState.all_profiles_fetched,
        all_users: authState.all_users,
        isError: authState.isError,
        message: authState.message
    });

    const router = useRouter();

    return(
        <UserLayout>
            <DashboardLayout>
                <div className={styles.searchPage}>
                    <h2 style={{margin: "0.5rem 0.5rem 2rem"}}>People</h2>

                    <div style={{backgroundColor: "whitesmoke", border: "1px solid silver", borderRadius: "20px", padding: "1.5rem"}}>
                        <div className={styles.allUserProfile}>
                            {authState.isError && (
                                <div style={{ color: 'red' }}>
                                    Error: {authState.message}
                                </div>
                            )}

                            {!authState.all_profiles_fetched && !authState.isError && (
                                <div>Loading users...</div>
                            )}

                            {authState.all_profiles_fetched && Array.isArray(authState.all_users) && 
                                authState.all_users.map((user) => {
                                return(
                                    <div onClick={() => {
                                        router.push(`/view_profile/${user.userId?.username}`)
                                    }} key={user._id} className={styles.userCard}>
                                        <img className={styles.userCard__image} src={`${BASE_URL}/uploads/${user?.userId?.profilePicture}`} alt="profile" />
                                        <div className={styles.text}>
                                            <h1>{user.userId?.name}</h1>
                                            <p>{user.userId?.username}</p>
                                        </div>
                                    
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </UserLayout>
    )
}
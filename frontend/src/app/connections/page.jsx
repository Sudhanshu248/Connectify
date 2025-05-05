"use client"

import UserLayout from "@/layout/UserLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { AcceptConnection, getMyConnectionRequests } from "@/config/redux/action/authAction";
import { useEffect } from "react";
import { BASE_URL } from "@/config/axiosConfig";
import styles from "./style.module.css";
import { useRouter } from "next/navigation";

export default function MyConnectionsPage() {

    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}))
    }, [])

    const router = useRouter();

    useEffect(() => {
        if(authState.connectionRequest.length != 0){
        }
    }, [authState.connectionRequest]);
    

    return(
        <UserLayout>
            <DashboardLayout>
                <div style={{display: "flex", flexDirection: "column", gap: "2rem"}}>
                    <h2>My Connections</h2>

                    <div style={{backgroundColor: "whitesmoke", border: "1px solid silver", borderRadius: "10px", padding: "1.5rem"}}>
                        {authState.connectionRequest.length == 0 && <h4>No Connections Found</h4>}
                        {authState.connectionRequest.length != 0 && authState.connectionRequest.filter((connection) => connection.status_accepted === null).map((user, index) => {
                            return(
                                <div onClick={() => {
                                    router.push(`/view_profile/${user.userId.username}`)
                                }} className={styles.userCard} key={index}>
                                    <div style={{display: "flex", alignItems: "center", gap: "1.2rem", justifyContent: "space-between"}}>

                                        <div className={styles.profilePicture}>
                                            <img src={`${BASE_URL}/uploads/${user.userId?.profilePicture}`} alt="" />
                                        </div>

                                        <div className={styles.userInfo}>
                                            <h3>{user.userId?.name}</h3>
                                            <p>{user.userId?.username}</p>
                                        </div>

                                        <button onClick={(e) => {
                                            e.stopPropagation();

                                            dispatch(AcceptConnection({
                                                connectionId: user._id,
                                                token: localStorage.getItem("token"),
                                                action: "accept"
                                            }))
                                        }}  className={styles.connectedButton}>
                                            Accept
                                        </button>

                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <h2>My Network</h2>
                    <div style={{backgroundColor: "whitesmoke", border: "1px solid silver", borderRadius: "10px", padding: "1.5rem"}}>
                        {authState.connectionRequest.filter((connection) => connection.status_accepted !== null).map((user, index) => {
                            return(
                                <div onClick={() => {
                                    router.push(`/view_profile/${user.userId.username}`)
                                }} className={styles.userCard} key={index}>
                                    <div style={{display: "flex", alignItems: "center", gap: "1.2rem", justifyContent: "space-between"}}>
                                        <div className={styles.profilePicture}>
                                            <img src={`${BASE_URL}/uploads/${user.userId?.profilePicture}`} alt="" />
                                        </div>

                                        <div className={styles.userInfo}>
                                            <h3>{user.userId?.name}</h3>
                                            <p>{user.userId?.username}</p>
                                        </div>
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </DashboardLayout>
         </UserLayout>
    )
}
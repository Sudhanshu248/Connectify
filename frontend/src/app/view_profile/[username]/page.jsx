"use client";
 
import clientServer, { BASE_URL } from "@/config/axiosConfig";
import DashboardLayout from "@/layout/DashboardLayout";
import UserLayout from "@/layout/UserLayout";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/config/redux/action/postAction";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getConnectionsRequest, getMyConnectionRequests, sendConnectionRequest } from "@/config/redux/action/authAction";
import { authState } from "@/config/redux/reducer/authReducer";
import { use } from "react"; 

export default function ViewProfilePage({ params }) {
    const { username } = use(params);

    const authState = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const postReducer = useSelector((state) => state.postReducer);
    const [userProfile, setUserProfile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [isCurrentUserInConnection, setIsCurrentUserInConnection] = useState(false);
    const [isConnectionNull, setIsConnectionNull] = useState(true);

    const getUsersPosts = async () => {
      await dispatch(getAllPosts());
      await dispatch(getConnectionsRequest({token: localStorage.getItem("token")}));
      await dispatch(getMyConnectionRequests({token: localStorage.getItem("token")}));
    }

    useEffect(() => {
        const fetchProfile = async () => {
          try {

              const response = await clientServer.get("/user/get_profile_based_on_username", {
                  params: { username }
              });

              setUserProfile(response.data.profile);

              } catch (error) {
              console.error("Error fetching profile:", error);
              }
        };

        fetchProfile();
    }, [username]);

    useEffect(() => {
      let post = postReducer.posts.filter((post) => {
        return post.userId?.username === username
      })

      setUserPosts(post);
    }, [postReducer.posts])

    useEffect(() => {
      if(authState.connections.some(user => user.connectionId._id === userProfile?.userId?._id)) {
        setIsCurrentUserInConnection(true);
        if(authState.connections.find(user => user.connectionId._id === userProfile.userId._id).status_accepted === true ) {
          setIsConnectionNull(false);
        }
      }

      if(authState.connectionRequest.some(user => user.userId._id === userProfile?.userId?._id)) {
        setIsCurrentUserInConnection(true);
        if(authState.connectionRequest.find(user => user.userId._id === userProfile.userId._id).status_accepted === true ) {
          setIsConnectionNull(false);
        }
      }
    }, [authState.connections, authState.connectionRequest])

    useEffect(() => {
      getUsersPosts();
    }, [])

    if (!userProfile) return <div>Loading profile...</div>;

    return (
        <UserLayout>
            <DashboardLayout>
                <div className={styles.container}>

                    <div className={styles.backDropContainer}>
                        <img src={`${BASE_URL}/uploads/${userProfile.userId.profilePicture}`} alt="Profile" />
                    </div>

                    <div className={styles.profileContainer_details}>    

                        <div className={styles.profileContainer__flex}>

                            <div className={styles.profile_sec1}>

                                <div style={{ display: "flex", width: "fit-content", alignItems: "center", gap: "1.2rem" }}>
                                    <h2>{userProfile.userId.name}</h2>
                                    <p style={{ color: "grey" }}>@{userProfile.userId.username}</p>
                                </div>

                                <div style={{display: "flex", alignItems: "center", gap: "1.5rem", margin: "1.2rem 0 "}}>
                                  {isCurrentUserInConnection
                                    ? 
                                    <button className={styles.connectedButton} style={{fontWeight: "200", fontSize: " 0.9rem"}}>{isConnectionNull ? "Pending" : "Connected"} </button>
                                    : 
                                    <button onClick= {() => {
                                      dispatch(sendConnectionRequest({token: localStorage.getItem("token"), user_id: userProfile.userId._id}));
                                    }} className={styles.connectBtn} style={{fontWeight: "200", fontSize: " 0.9rem"}}>Connect</button>
                                  }

                                  <div onClick={async () => {
                                    const response = await clientServer.get(`/user/download_resume?id=${userProfile.userId._id}`);
                                    window.open(`${BASE_URL}/uploads/${response.data.message}`, "_blank")
                                    }} style={{cursor: "pointer"}} className={styles.connectBtn}>

                                    <svg style={{width: "1.1em ", height: "1em"}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                    </svg>

                                    &nbsp; <span style={{fontWeight: "400", fontSize: " 0.9rem"}}>Resume</span>
                                  </div>
                                </div>

                                <div>
                                  <p>{userProfile.bio}</p>
                                </div>

                            </div>

                        </div>
                            <div className={styles.profile_sec2}>

                                  <h3 style={{margin: "0.5rem 0.2rem 1rem"}}>Recent Activity</h3> <hr />
                                  <div className={styles.postBox}>{userPosts.map((post) => {
                                    return(
                                      
                                        <div key={post._id} className={styles.postCard}>
                                          <div className={styles.card}>
                                            <div className={styles.card__profileContainer}>
                                              {post.media !== "" ? <img src={`${BASE_URL}/uploads/${post.media}`}/> : <div style={{width: "3.4rem", height: "3.4rem"}}></div>}
                                            </div>

                                            <p style={{paddingLeft: "0.5rem"}}>{post.body}</p>
                                          </div>
                                        </div>
                                      )
                                    })}
                                  </div>

                            </div>

                    </div>

                    <div className={styles.profile_sec2}>
                      <h3 style={{margin: "0.5rem 0.2rem 1rem"}}>Work History</h3> <hr />

                      <div className={styles.workHistoryContainer}>
                              {
                                userProfile.pastWork.map((work, index) => {
                                  return (
                                    <div key={index} className={styles.workHistoryCard}>
                                      <h3 style={{fontWeight: "bold", display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1rem"}}>{work.company} </h3>
                                      <p ><span style={{fontWeight: "bold"}}>Position:</span> {work.postion}</p>
                                      
                                      <p> <span style={{fontWeight: "bold"}}>Work: </span> {work.years} Years</p>
                                    </div>
                                  )
                                })
                              }
                      </div>
                    </div>
                </div>
            </DashboardLayout>
        </UserLayout>
    );
}
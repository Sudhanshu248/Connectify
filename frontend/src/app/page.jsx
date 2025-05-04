"use client";

import ReduxProvider from "./provider";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import UserLayout from "@/layout/UserLayout";

export default function Home() {
  const router = useRouter();

  return (
    <ReduxProvider>
      <UserLayout>
        <div className={styles.container}> 
            <div className={styles.mainContainer}>
              <div className={styles.mainContainer_left}>
                <p>Connect with Friends without Exaggeration</p>
                <p>A True social media platform, with stories no blufs !</p>

                <div onClick={() => router.push("/login")} className={styles.buttonJoin}>
                  <p>Join Now</p>
                </div>
              </div>
              <div className={styles.mainContainer_right}>
                <img src="/images/HomePage.png" alt="HomePage"/>
              </div>
            </div>
        </div>
      </UserLayout>
    </ReduxProvider>
  );
}

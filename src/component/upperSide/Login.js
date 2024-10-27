import { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./css/Login.module.css";
import {
    faRightFromBracket,
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

function Login({ setLoggedIn, setUserInfo }) {
  const [hover, setHover] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [userInfo, setLocalUserInfo] = useState(null);

  const handleLogin = useGoogleLogin({
    onSuccess: (response) => {
      fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${response.access_token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Login Successful:", data);
          setUserInfo(data);
          setLocalUserInfo(data);
          localStorage.setItem("user", JSON.stringify(data));
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log("Failed to fetch user info:", err);
        });
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleLogout = () => {
    setLoggedIn(false);
    googleLogout();
    localStorage.removeItem("user");
    setUserInfo(null);
    setLocalUserInfo(null);
    console.log("logged out");
  };

  const handleMouseEnter = () => {
    setHover(true);
    setTimeout(() => setShowInfo(true), 350);
  };

  const handleMoseLeave = () => {
    setHover(false);
    setShowInfo(false);
  };

  return (
    <button
      className={`${
        userInfo
          ? hover
            ? styles.profileContainer
            : styles.circle
          : styles.circle
      }`}
      onClick={userInfo ? handleLogout : handleLogin}
      onMouseEnter={handleMouseEnter}
      onMouseLeaver={handleMoseLeave}
    >
      {userInfo ? (
        hover ? (
          showInfo && (
            <>
              <img
                src={userInfo.picture}
                className={styles.circle}
                style={{ width: "1.8em", height: "1.8em", overflow: "hidden" }}
              />
              <span className={styles.nickname}>{userInfo.name}</span>
            </>
          )
        ) : (
          <FontAwesomeIcon icon={faRightFromBracket} />
        )
      ) : (
        <FontAwesomeIcon icon={faRightToBracket} />
      )}
    </button>
  );
}

export default Login;

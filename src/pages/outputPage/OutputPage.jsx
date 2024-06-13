import React, { useState, useEffect, useRef } from "react";
import styles from "./outputPage.module.css";
import { useNavigate, Link } from "react-router-dom";

import Qr from "../../components/qr/Qr";
import Loader from "../../components/loader/Loader";

import logo from "./../../assets/logo.png";

export default function OutputPage({ generatedImg, url }) {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [showQr, setShowQr] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      navigate("/");
    }, 20000);
  };

  useEffect(() => {
    resetTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleUserInteraction = () => {
    resetTimeout();
  };

  return (
    <div
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onKeyPress={handleUserInteraction}
      className={`flex-col-center ${styles.OutputPage}`}
    >
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={`flex-col-center ${styles.bottom}`}>
        <h1 className={styles.h1}>
          {generatedImg ? "READY TO DOWNLOAD ?" : "PLEASE WAIT...!"}
        </h1>

        {generatedImg ? (
          <div className={styles.generatedImgContainer}>
            <div className={styles.imgContainer}>
              <img src={generatedImg} alt="generated-image" />
            </div>
            <div className={`flex-row-center ${styles.btnContainer}`}>
              {/* generate qr */}
              <div onClick={() => setShowQr(true)}>
                <button className={`btn1`}>GENERATE QR</button>
              </div>

              {/* <Link to={"/"}>
                <button className={`btn2`}>HOME</button>
              </Link> */}
            </div>
          </div>
        ) : (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}
      </div>

      {/* qr */}
      {showQr && <Qr url={url} setShowQr={setShowQr} />}
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import styles from "./cameraPage.module.css";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Webcam from "react-webcam";

import logo from "./../../assets/logo.png";
import preparing from "./../../assets/cameraPage/preparing.png";

export default function CameraPage({ setCapturedImg, setGeneratedImg }) {
  const webRef = useRef();
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const [img, setImg] = useState();
  const [isCaptured, setIsCaptured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 4500);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      navigate("/");
    }, 30000);
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

  // handle-capture

  const handleCapture = e => {
    const screenshot = webRef.current.getScreenshot({ format: "image/jpeg" });
    if (screenshot) {
      setIsCaptured(true);
      setImg(screenshot);
      console.log(screenshot);
    }
  };

  // handle-retake
  const handleRetake = e => {
    setIsCaptured(false);
    img && setImg("");
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // handle submit
  const handleSubmit = () => {
    // console.log("captured image submitting");
    setCapturedImg("");
    setGeneratedImg("");
    if (img) {
      setCapturedImg(img);
      navigate("/hair-color");
    } else {
      toast.error("Please capture your image", toastOptions);
    }
  };

  return (
    <div
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onKeyPress={handleUserInteraction}
      className={`flex-col-center ${styles.CameraPage}`}
    >
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      {isLoading && (
        <div className={`flex-col-center ${styles.bottom}`}>
          <h1>{isCaptured ? "DO YOU LIKE THIS ?" : "VIRTUAL TRY-ON"}</h1>

          <main className={styles.main}>
            <div className={styles.webcamParent}>
              <Webcam
                ref={webRef}
                id={styles.webcam}
                forceScreenshotSourceSize={true}
                screenshotFormat="image/jpeg"
              />
              {img && (
                <img
                  src={img}
                  alt="captured image"
                  className={styles.capturedImage}
                />
              )}
            </div>
          </main>

          <footer className={`flex-col-center ${styles.footer}`}>
            {isCaptured ? (
              <div className={`flex-col-center ${styles.foot}`}>
                <div onClick={handleSubmit}>
                  <button className={`btn1`}>YES! SUBMIT </button>
                </div>

                <div onClick={e => handleRetake(e)}>
                  <button className={`btn1`}>RETAKE</button>
                </div>
              </div>
            ) : (
              <div onClick={e => handleCapture(e)}>
                <button className={`btn1`}>CAPTURE</button>
              </div>
            )}
          </footer>
        </div>
      )}

      {!isLoading && (
        <div className={`flex-col-center ${styles.bottom}`}>
          <div className={`flex-row-center ${styles.preparingImgContainer}`}>
            <img src={preparing} alt="preparing-img" />
          </div>

          {/* loader */}
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState, useRef } from "react";
import styles from "./hairColorPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

import { shadesArr } from "../../utils/shades";
import { originalImage } from "../../utils/originalImg";

import logo from "./../../assets/logo.png";
import avatar from "./../../assets/hairColorPage/avatar.jpg";
import tick from "./../../assets/hairColorPage/tick.png";

export default function HairColorPage({
  generatedImg,
  setGeneratedImg,
  capturedImg,
  setUrl,
}) {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);
  const [generatedImages, setGeneratedImages] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(generatedImages);

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

  // toast options
  const toastOptions = {
    position: "top-center",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // image uploading on server
  const getUrl = url => {
    axios
      .post(
        "https://analytiq4.com/aiphotobooth/aiphotobooth_bluehat/upload.php",
        {
          img: url,
        }
      )
      .then(function (response) {
        setUrl(response.data.url);
        // console.log("image uploaded on server");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    if (generatedImg && capturedImg) {
      // image uploading on server
      getUrl(generatedImg.split(",")[1]);
      navigate("/output");
    } else {
      toast.error(
        "Please select a shade or capture your photo again...",
        toastOptions
      );
    }
  };

  useEffect(() => {
    if (selectedImageIndex != null) {
      if (generatedImages[selectedImageIndex]) {
        setGeneratedImg(generatedImages[selectedImageIndex]);
      } else {
        setGeneratedImg("");
        setLoading(true);
        if (capturedImg) {
          try {
            axios
              .post("https://h.ngrok.dev/rec", {
                image: capturedImg.split(",")[1],
                number: String(selectedImageIndex),
              })
              .then(function (response) {
                const newGeneratedImg = `data:image/webp;base64,${response.data.result}`;
                setGeneratedImg(newGeneratedImg);

                // Store the generated image in the object with index as key
                setGeneratedImages(prev => ({
                  ...prev,
                  [selectedImageIndex]: newGeneratedImg,
                }));

                setLoading(false);
              })
              .catch(function (error) {
                console.log(error);
                setLoading(false);
                setGeneratedImg("");
              });
            // navigate("/output");
          } catch (error) {
            console.error("something went wrong", error);
            setGeneratedImg("");
          }
        } else {
          toast.error(
            "Please select a shade or capture your photo again...",
            toastOptions
          );
        }
      }
    }
  }, [selectedImageIndex]);

  return (
    <div
      onClick={handleUserInteraction}
      onMouseMove={handleUserInteraction}
      onKeyPress={handleUserInteraction}
      className={`flex-col-center ${styles.HairColorPage}`}
    >
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={`flex-col-center ${styles.bottom}`}>
        <h1>SELECT YOUR SHADE</h1>
        <div className={`flex-row-center ${styles.imgContainer}`}>
          {capturedImg && !generatedImg && (
            <img src={capturedImg} alt="captured-image" />
          )}
          {generatedImg && <img src={generatedImg} alt="generated-image" />}

          {loading && (
            <div className={`flex-row-center ${styles.loaderContainer}`}>
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
        <div className={`flex-row-center ${styles.shades}`}>
          {shadesArr?.map((item, index) => (
            <div
              key={index}
              className={`flex-row-center ${styles.shadeContainer}`}
              onClick={() => {
                setSelectedImageIndex(index);
              }}
            >
              <img
                src={selectedImageIndex === index ? tick : item}
                alt={`shade${index}`}
              />
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} className={`btn1`}>
          YES! SUBMIT
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}

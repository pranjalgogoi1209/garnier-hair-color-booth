import React, { useEffect, useState, useRef } from "react";
import styles from "./learningCategoryPage.module.css";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import logo from "./../../../assets/logo.png";
import homeBtn from "./../../../assets/learningCategory/homeBtn.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import beforeImg01 from "./../../../assets/learningCategory/beforeHairColoring/beforeImg01.png";
import beforeImg02 from "./../../../assets/learningCategory/beforeHairColoring/beforeImg02.png";
import beforeImg03 from "./../../../assets/learningCategory/beforeHairColoring/beforeImg03.png";
import beforeImg04 from "./../../../assets/learningCategory/beforeHairColoring/beforeImg04.png";
import whileImg01 from "./../../../assets/learningCategory/whileHairColoring/whileImg01.png";
import whileImg02 from "./../../../assets/learningCategory/whileHairColoring/whileImg02.png";
import whileImg03 from "./../../../assets/learningCategory/whileHairColoring/whileImg03.png";
import whileImg04 from "./../../../assets/learningCategory/whileHairColoring/whileImg04.png";
import whileImg05 from "./../../../assets/learningCategory/whileHairColoring/whileImg05.png";
import afterImg01 from "./../../../assets/learningCategory/afterHairColoring/afterImg01.png";
import trendImg02 from "./../../../assets/learningCategory/hairColorTrends/trendImg02.png";

import beforeVideo01 from "./../../../assets/learningCategory/beforeHairColoring/beforeVideo01.mp4";

const categories = [
  {
    title: "BEFORE<br/>HAIR COLORING",
    ctgy: "before-hair-coloring",
    containers: [
      {
        img: beforeImg01,
        video: beforeVideo01,
        des: "HOW TO CHOOSE THE RIGHT SHADE?",
      },
      {
        img: beforeImg02,
        video: beforeVideo01,
        des: "WILL COLORING MY HAIR DAMAGE IT?",
      },
      {
        img: beforeImg03,
        video: beforeVideo01,
        des: "HOW TO PERFORM THE ALLERGY TEST?",
      },
      {
        img: beforeImg04,
        video: beforeVideo01,
        des: "HOW LONG WILL IT TAKE TO<br/>COLOUR HAIR AT HOME?",
      },
    ],
  },
  {
    title: "WHILE<br/>HAIR COLORING",
    ctgy: "while-hair-coloring",
    containers: [
      {
        img: whileImg01,
        video: beforeVideo01,
        des: "WHAT TO KEEP HANDY?",
      },
      {
        img: whileImg02,
        video: beforeVideo01,
        des: "HOW TO MIX THE COLOR?",
      },
      {
        img: whileImg03,
        video: beforeVideo01,
        des: "HOW TO AVOID STAINING MY SKIN",
      },
      {
        img: whileImg04,
        video: beforeVideo01,
        des: "HOW TO SECTION MY HAIR?",
      },
      {
        img: whileImg05,
        video: beforeVideo01,
        des: "HOW TO COLOR DIFFICULT<br/>PORTIONS OF MY HAIR?",
      },
    ],
  },
  {
    title: "AFTER<br/>HAIR COLORING",
    ctgy: "after-hair-coloring",
    containers: [
      {
        img: afterImg01,
        video: beforeVideo01,
        des: "HOW TO RINSE OFF THE HAIR COLOR?",
      },
    ],
  },
  {
    title: "HAIR COLOR<br/>TRENDS",
    ctgy: "hair-color-trends",
    containers: [
      {
        img: whileImg01,
        video: beforeVideo01,
        des: "HOW TO GO FOR<br/>A GLOBAL HAIR COLOR AT HOME?",
      },
      {
        img: trendImg02,
        video: beforeVideo01,
        des: "HOW TO DO HAIR HIGHLIGHTS<br/>AT HOME?",
      },
      {
        img: whileImg03,
        video: beforeVideo01,
        des: "+ LOOKBOOK - PICTURES & VIDEOS<br/>OF VISIBLE TRANSFORMATION",
      },
    ],
  },
];

export default function LearningCategoryPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [learningCategory, setLearningCategory] = useState();
  const timeoutRef = useRef(null);
  const [openVideoIndex, setOpenVideoIndex] = useState(null);

  useEffect(() => {
    const lCtgy = categories.find(item => item.ctgy === category);
    setLearningCategory(lCtgy);
  }, [category]);

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
      className={`flex-col-center ${styles.LearningCategoryPage} ${
        learningCategory?.ctgy === "while-hair-coloring"
          ? styles.learningCategoryDiffPage
          : ""
      } ${
        learningCategory?.ctgy === "after-hair-coloring"
          ? styles.learningCategoryAfterPage
          : ""
      }`}
    >
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={`flex-col-center ${styles.bottom}`}>
        {/* <h1>{learningCategory?.title}</h1> */}
        <h1 dangerouslySetInnerHTML={{ __html: learningCategory?.title }} />

        <div className={`flex-row-center ${styles.categories}`}>
          {learningCategory?.containers.map((item, index) => (
            <div
              key={index}
              onClick={() => setOpenVideoIndex(index)}
              className={`flex-col-center ${styles.singleContainer}`}
            >
              <div className={`flex-row-center ${styles.imgContainer}`}>
                <img src={item.img} alt={`hair-category-${index}`} />
              </div>
              <p
                className={`txt1 ${styles.txt}`}
                dangerouslySetInnerHTML={{ __html: item?.des }}
              />
              <button className={`btn2 ${styles.btn}`}>FIND OUT</button>

              {/* video */}
              {openVideoIndex === index && (
                <div
                  onClick={e => {
                    e.stopPropagation();
                    setOpenVideoIndex(null);
                  }}
                  className={`flex-row-center ${styles.videoContainer}`}
                >
                  <video
                    controls
                    autoPlay
                    onPlay={handleUserInteraction}
                    onPause={handleUserInteraction}
                    onTimeUpdate={handleUserInteraction}
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>

                  {/* close */}
                  <div
                    onClick={e => {
                      e.stopPropagation();
                      setOpenVideoIndex(null);
                    }}
                    className={styles.closeContainer}
                  >
                    <IoIosCloseCircleOutline />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* home btn */}
        <Link to={"/learning"} className={styles.homeBtn}>
          <img src={homeBtn} alt="home" />
        </Link>
      </div>
    </div>
  );
}

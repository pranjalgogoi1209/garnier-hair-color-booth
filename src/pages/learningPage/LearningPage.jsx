import React, { useEffect, useRef } from "react";
import styles from "./learningPage.module.css";
import { useNavigate, Link } from "react-router-dom";

import logo from "./../../assets/logo.png";
import img01 from "./../../assets/learningPage/img01.png";
import img02 from "./../../assets/learningPage/img02.png";
import img03 from "./../../assets/learningPage/img03.png";
import img04 from "./../../assets/learningPage/img04.png";
import learningImg from "./../../assets/learningPage/learningPageImg.png";

const categories = [
  {
    img: img01,
    title: "BEFORE HAIR COLORING",
    category: "before-hair-coloring",
  },
  {
    img: img02,
    title: "WHILE HAIR COLORING",
    category: "while-hair-coloring",
  },
  {
    img: img03,
    title: "AFTER HAIR COLORING",
    category: "after-hair-coloring",
  },
  {
    img: img04,
    title: "HAIR COLOR TRENDS",
    category: "hair-color-trends",
  },
];
export default function LearningPage() {
  const navigate = useNavigate();
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      navigate("/");
    }, 20000);

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [navigate]);

  return (
    <div className={`flex-col-center ${styles.LearningPage}`}>
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={`flex-col-center ${styles.bottom}`}>
        <div className={`flex-col-center ${styles.title}`}>
          <h2>HOW TO</h2>
          <p className={`des`}>COLOR YOUR HAIR AT HOME?</p>
        </div>

        <div className={`flex-row-center ${styles.categories}`}>
          {categories?.map((item, index) => (
            <Link
              to={`/learning/${item.category}`}
              key={index}
              className={`flex-col-center ${styles.singleContainer}`}
            >
              <div className={`flex-row-center ${styles.imgContainer}`}>
                <img src={item.img} alt={`hair-category-${index}`} />
              </div>
              <button className={`btn2`}>{item.title}</button>
            </Link>
          ))}
        </div>
      </div>

      <div className={`flex-row-center ${styles.footer}`}>
        <div className={`flex-col-center ${styles.leftContainer}`}>
          <h3>
            FIND YOUR <br /> PERFECT SHADE
          </h3>
          <Link to={"/camera"}>
            <button className={`btn3`}>START NOW</button>
          </Link>
        </div>
        <div className={`flex-row-center ${styles.imgContainer}`}>
          <img src={learningImg} alt="learning-img" />
        </div>
      </div>
    </div>
  );
}

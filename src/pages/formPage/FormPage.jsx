import React, { useEffect, useState } from "react";
import styles from "./formPage.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import logo from "./../../assets/logo.png";
import formPageImg from "./../../assets/formPage/formPageImg.png";
import tick from "./../../assets/hairColorPage/tick.png";

export default function FormPage({ setCapturedImg, setGeneratedImg }) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setCapturedImg("");
    setGeneratedImg("");
    if (!isChecked) {
      alert("You must agree to the terms and conditions.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", formData);

      if (response.status === 200) {
        alert("Form submitted successfully!");
        navigate("/learning");
      } else {
        alert("Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // alert("An error occurred. Please try again.");
      navigate("/learning");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* useEffect(() => {
    setTimeout(() => {
      navigate("/camera");
    }, 1000);
  }, []); */

  return (
    <div className={`flex-col-center ${styles.FormPage}`}>
      {/* logo */}
      <Link to={"/"} className={`flex-row-center ${styles.logoContainer}`}>
        <img src={logo} alt="logo" />
      </Link>

      <div className={`flex-col-center ${styles.bottom}`}>
        <div className={`flex-col-center ${styles.title}`}>
          <h2>HAIR COLOR</h2>
          <p className={`des`}>EASY TO USE AT HOME!</p>
        </div>

        <div className={`flex-row-center ${styles.imgContainer}`}>
          <img src={formPageImg} alt="form-image" />
        </div>

        <form
          onSubmit={handleSubmit}
          className={`flex-col-center ${styles.form}`}
        >
          <input
            type="text"
            name="name"
            placeholder="NAME"
            required
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="E-MAIL"
            required
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="PHONE NO"
            required
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />

          <div
            onClick={() => setIsChecked(prev => !prev)}
            className={`flex-row-center ${styles.inputContainer}`}
          >
            <div className={styles.customCheckbox}>
              {isChecked && <img src={tick} alt="selected" />}
            </div>
            <label htmlFor="checkbox">I AGREE TO TERMS AND CONDITIONS</label>
          </div>

          <button className={`btn1 ${styles.btn}`}>LET'S GET LEARNING</button>
        </form>
      </div>
    </div>
  );
}

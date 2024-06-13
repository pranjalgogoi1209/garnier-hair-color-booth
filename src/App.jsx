import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CameraPage from "./pages/cameraPage/CameraPage";
import HairColorPage from "./pages/hairColorPage/HairColorPage";
import OutputPage from "./pages/outputPage/OutputPage";
import FormPage from "./pages/formPage/FormPage";
import LearningPage from "./pages/learningPage/LearningPage";
import LearningCategoryPage from "./pages/learningPage/learningCategoryPage/LearningCategoryPage";

export default function App() {
  const [capturedImg, setCapturedImg] = useState();
  const [generatedImg, setGeneratedImg] = useState();
  const [url, setUrl] = useState();

  return (
    <BrowserRouter>
      <Routes>
        {/* form page */}
        <Route
          path={"/"}
          element={
            <FormPage
              setCapturedImg={setCapturedImg}
              setGeneratedImg={setGeneratedImg}
            />
          }
        />

        {/* learning page */}
        <Route path={"/learning"} element={<LearningPage />} />

        {/* learning category page */}
        <Route path="/learning/:category" element={<LearningCategoryPage />} />

        {/* camera page */}
        <Route
          path={"/camera"}
          element={
            <CameraPage
              setCapturedImg={setCapturedImg}
              setGeneratedImg={setGeneratedImg}
            />
          }
        />

        {/* hair color page */}
        <Route
          path="/hair-color"
          element={
            <HairColorPage
              capturedImg={capturedImg}
              generatedImg={generatedImg}
              setGeneratedImg={setGeneratedImg}
              setUrl={setUrl}
            />
          }
        />

        {/* output page */}
        <Route
          path="/output"
          element={<OutputPage generatedImg={generatedImg} url={url} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

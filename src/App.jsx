import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";

import "./App.css";

import NavBar from "./components/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BottomBar from "./components/BottomBar";
import SignUp from "./pages/SignUp";
import SelectCategories from "./pages/SelectCategories";
import NewGame from "./pages/NewGame";
import GameHistory from "./pages/GameHistory";
import AddQuestions from "./pages/AddQuestions";
import AddCategory from "./pages/AddCategory";
import ShowAllQuestions from "./pages/ShowAllQuestions";

function App() {
  const [orientation, setOrientation] = useState("");
  useEffect(() => {
    // Function to update the orientation state
    function updateOrientation() {
      setOrientation(window.screen.orientation.type);
    }
    // Initial update of the orientation state
    updateOrientation();
    // Add an event listener for orientation change
    window.addEventListener("orientationchange", updateOrientation);
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [orientation]);

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  }, []);
  return (
    <>
      <div className="bk">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/select-categories" element={<SelectCategories />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/new-game" element={<NewGame />} />
          <Route path="/game-history" element={<GameHistory />} />
          <Route path="/add-questions" element={<AddQuestions />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/all-questions" element={<ShowAllQuestions />} />
        </Routes>
        <BottomBar />
      </div>
    </>
  );
}

export default App;

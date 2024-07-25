import React, { useState, useEffect } from "react";
import "./styles/animation.css";
import { BiUpArrow } from "react-icons/bi";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  // Scroll to the top of the page when button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="back-to-top">
      {isVisible && (
        <div onClick={scrollToTop}>
          <BiUpArrow />
        </div>
      )}
    </div>
  );
};

export default BackToTopButton;

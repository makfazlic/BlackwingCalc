import logo from "../images/logo.png";
import prob from "../images/prob.jpg";
import coffee from "../images/coffee.avif";
import homepage from "../images/homepage.png";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxEyeClosed } from "react-icons/rx";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // If isOpen is true, make an overlay over the whole page to prevent user from interacting with the page except for the span and show the menu
    if (isOpen) {
        document.getElementById("overlay").style.display = "block";
        } else {
        document.getElementById("overlay").style.display = "none";
    }
  }, [isOpen]);

  return (
    <>
      <div className="py-4 px-3 w-full flex justify-center items-center relative">
        <img src={logo} alt="logo" className="h-10" />
        <span className="absolute right-5 font-bold text-3xl">
          {!isOpen ? (
            <FaBarsStaggered onClick={() => setIsOpen(!isOpen)} />
          ) : (
            <></>
          )}
        </span>
      </div>
      <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-10 overflow-y-auto" id="overlay"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
            setIsOpen(!isOpen);
          }
      }
        }>
        <nav className="bg-white w-1/3 overflow-y-auto my-4 rounded-r-lg">
          <div className="flex flex-col justify-center items-start h-full py-4 px-3 space-y-4 font-bold">

          <Link to="/"
              className="w-full h-48 rounded-lg border-3 border-black flex justify-center items-center hover:opacity-80 transition duration-100"
              style={{
                // make darkened overlay over the image
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(" + homepage + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ><p className="text-2xl font-bold text-white">Home page</p></Link>
          <Link to="/probability-calculator"
              className="w-full h-48 rounded-lg border-3 border-black flex justify-center items-center hover:opacity-80 transition duration-100"
              style={{
                // make darkened overlay over the image
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(" + prob + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ><p className="text-2xl font-bold text-white">Card Probability Calculator</p></Link>
            <Link to="/support" 
              className="w-full h-48 rounded-lg border-3 border-black flex justify-center items-center hover:opacity-80 transition duration-100"
              style={{
                // make darkened overlay over the image
                backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(" + coffee + ")",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ><p className="text-2xl font-bold text-white">Support the work</p></Link>


          </div>
        </nav>

      </div>
    </>
  );
}

"use client";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import 'material-icons/iconfont/material-icons.css';
import { useEffect, useState } from "react";
import Image from "next/image";
import NavBar from "@/components/Navbar";
import secureLocalStorage from "react-secure-storage";
// import Footer from "@/components/Footer";

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
      easing: 'ease-in-out',
      delay: 100,
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    secureLocalStorage.getItem("anokha-t") ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="text-white text-center mt-32">Home moved to /intel-admin</h1>
      {/* <Footer /> */}
    </>
  )
}

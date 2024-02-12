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
      <main>
        <div className="relative isolate px-6 lg:px-8 flex justify-center items-center m-auto">
          <div
            className="absolute inset-x-0 px-20 -top-40 -z-10 transform-gpu overflow-hidden blur-2xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[64%] -translate-x-1/2 rotate-[40deg] bg-gradient-to-tr from-[#a8abce] to-[#a9afde] opacity-10"
            />
          </div>

          <div className="mx-auto max-w-2xl pt-32 overflow-hidden" data-aos="fade-in">
            {isLoggedIn == false ? (<div className="flex justify-center text-center">
              <Link href={"/login"}>
                <div className='relative rounded-full px-2 py-2 mt-0 mb-4 md:px-3 md:py-2 md:my-8 text-xs md:text-sm leading-6 text-gray-200 ring-1 ring-gray-300/10 hover:ring-gray-50/20 items-center align-middle flex flex-row'>
                  {"Intel Admin Login"}
                  <span className="material-icons ml-2">open_in_new</span>
                </div>
              </Link>
            </div>) : (<div className="flex justify-center text-center">
              <Link href={"https://anokha.amrita.edu"} target='_blank'>
                <div className='relative rounded-full px-2 py-2 mt-0 mb-4 md:px-3 md:py-2 md:my-8 text-xs md:text-sm leading-6 text-gray-200 ring-1 ring-gray-300/10 hover:ring-gray-50/20 items-center align-middle flex flex-row'>
                  {"Visit Anokha 2024"}
                  <span className="material-icons ml-2">open_in_new</span>
                </div>
              </Link>
            </div>)}
            {/* <Image alt="pragathi main" src="/im_1.jpg" className="rounded-xl ml-auto mr-auto" width={480} height={320} /> */}
            <div className="text-center mt-8">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-lime-50">
                Intel oneAPI Hackathon
              </h1>
              <p className="text-xs md:text-base leading-8 text-gray-400 mt-1 md:mt-3 mb-4">
                {"Registrations now open"}
              </p>
            </div>
          </div>
        </div>
      </main >
      {/* <Footer /> */}
    </>
  )
}

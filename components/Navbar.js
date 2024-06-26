"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import 'material-icons/iconfont/material-icons.css';
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import 'material-icons/iconfont/material-icons.css'

export default function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [windowWidth, setWindowWidth] = useState(0);

    const router = useRouter();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        secureLocalStorage.getItem("anokha-t") ? setIsLoggedIn(true) : setIsLoggedIn(false);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        handleResize(); // Initial window width

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <header data-aos="fade-in" className="flex justify-center items-center w-fit ml-auto mr-auto sticky z-40 top-0 mt-4">
            <nav className="md:w-fit md:ml-auto md:mr-auto md:rounded-xl md:h-fit bg-[#292a2d66] backdrop-blur-lg md:align-middle md:items-center md:p-2 relative
            m-0 px-2 z-10 w-fit ml-auto mr-auto rounded-xl h-fit flex items-center flex-col space-y-2">

                {/* Main Navigation */}
                <ul className="flex flex-row justify-center align-middle items-center">

                    {/* Hamburger Menu Icon */}
                    <div className="md:hidden cursor-pointer p-4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? (
                            <i className="material-icons p-2 text-white hover:bg-white hover:text-black hover:rounded-xl">close</i>
                        ) : (
                            <i className="material-icons p-2 text-white hover:bg-white hover:text-black hover:rounded-xl">sort</i>
                        )}
                    </div>


                    <div className={(windowWidth < 768) ? "block w-fit ml-auto mr-auto" : "flex flex-row"}>
                        <Link className="rounded-xl h-fit bg-[#00000066] backdrop:blur-lg flex justify-center items-center align-middle px-2 py-3 text-white cursor-pointer hover:bg-white hover:px-4 hover:text-black hover:shadow-lg w-fit ml-auto mr-auto md:my-0" href="/">
                            <span className="font-semibold">Intel oneAPI Hackathon</span>
                        </Link>
                        <span className={`md:flex md:flex-row md:space-y-0 md:pt-0 flex flex-col space-y-3 pt-2 pb-3 md:pb-0 items-center align-middle ${isMenuOpen && windowWidth < 768 ? 'flex' : 'hidden'}`}>
                            {isLoggedIn ? (
                                <li className="text-white relative cursor-pointer whitespace-nowrap"><Link className="text-white px-2 py-4 m-2 hover:bg-white hover:px-4 hover:py-3 hover:rounded-xl hover:text-black hover:shadow-lg cursor-pointer" href="/round-one">1st Round</Link></li>
                            ) : null}
                            {isLoggedIn ? (
                                <li className="text-white relative cursor-pointer whitespace-nowrap"><Link className="text-white px-2 py-4 m-2 hover:bg-white hover:px-4 hover:py-3 hover:rounded-xl hover:text-black hover:shadow-lg cursor-pointer" href="/round-two">2nd Round</Link></li>
                            ) : null}
                            {isLoggedIn ? (
                                <li className="text-white relative cursor-pointer whitespace-nowrap"><Link className="text-white px-2 py-4 m-2 hover:bg-white hover:px-4 hover:py-3 hover:rounded-xl hover:text-black hover:shadow-lg cursor-pointer" href="/round-three">3rd Round</Link></li>
                            ) : null}
                            {isLoggedIn ? (
                                <li className="text-white relative cursor-pointer whitespace-nowrap"><Link className="text-white px-2 py-4 m-2 hover:bg-white hover:px-4 hover:py-3 hover:rounded-xl hover:text-black hover:shadow-lg cursor-pointer" href={""} onClick={() => {
                                    secureLocalStorage.clear();
                                    setIsLoggedIn(false);
                                    router.reload();
                                }}>Logout</Link></li>
                            ) : (
                                <li className="text-white relative cursor-pointer whitespace-nowrap"><Link className="text-white px-2 py-4 m-2 hover:bg-white hover:px-4 hover:py-3 hover:rounded-xl hover:text-black hover:shadow-lg cursor-pointer" href="/login">Login</Link></li>
                            )}
                        </span>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

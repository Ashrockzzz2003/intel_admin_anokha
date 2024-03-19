"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import validator from 'validator';
import 'material-icons/iconfont/material-icons.css';
import { LOGIN_URL } from "@/components/constants";
import secureLocalStorage from "react-secure-storage";
import { hashPassword } from "@/components/hashData";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";

export default function LoginScreen() {
    const router = useRouter();

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const isValidPassword = userPassword.length >= 8;
    const isValidEmail = validator.isEmail(userEmail);

    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!isValidEmail || !isValidPassword) {
            alert('Invalid Email/Password.\nPlease enter a valid EmailID/Password to continue');
            return;
        }

        setIsLoading(true);

        try {

            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    managerEmail: userEmail,
                    managerPassword: hashPassword(userPassword)
                })
            });

            if (response.status === 200) {
                const data = await response.json();

                secureLocalStorage.clear();

                secureLocalStorage.setItem('anokha-t', data["SECRET_TOKEN"]);

                if (data["managerRoleId"] === 9 || data["managerRoleId"] === 1 || data["managerRoleId"] === 2) {
                    router.push('/round-two');
                } else if (data["managerRoleId"] !== 9 || data["managerRoleId"] !== 1 || data["managerRoleId"] !== 2) {
                    alert('You are not authorized to access this portal');
                } else {
                    alert('Something went wrong, please try again later');
                }

                return;
            } else if (response.status === 400) {
                const data = await response.json();

                if (data["MESSAGE"]) {
                    alert(data["MESSAGE"]);
                    return;
                }
            } else if (response.status === 401) {
                alert('Invalid Credentials\nPlease enter your valid EmailID/Password to continue');
                return;
            } else {
                alert('Something went wrong, please try again later');
                return;
            }

        } catch (err) {
            console.log(err);
            alert('Something went wrong, please try again later');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        secureLocalStorage.clear();
        setUserEmail('');
        setUserPassword('');
    }, []);

    return <>
        <NavBar />
        <main className="flex h-[90vh] flex-1 flex-col justify-center mt-4 md:mt-0">
            <div className="border border-gray-300 rounded-2xl mx-auto w-11/12 sm:max-w-11/12 md:max-w-md lg:max-w-md backdrop-blur-xl bg-gray-50">
                <div
                    className="absolute inset-x-0 -top-10 -z-10 transform-gpu overflow-hidden blur-2xl"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[64%] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#a8abce] to-[#a9afde] opacity-10"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%, 45.2% 34.5%)',
                        }}
                    />
                </div>

                <div className="mx-auto w-full sm:max-w-11/12 md:max-w-md lg:max-w-md">
                    <div className='flex flex-row justify-center'>
                        <h1 className='px-4 py-4 w-full text-2xl font-semibold text-center text-black'>Intel Admin Login</h1>
                    </div>
                    <hr className='border-gray-300 w-full' />
                </div>

                <div className="mt-10 mx-auto w-full sm:max-w-11/12 md:max-w-md lg:max-w-md px-6 pb-8 lg:px-8 ">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-md font-medium leading-6 text-black">
                                Email ID
                            </label>
                            <div className="mt-2">
                                <input
                                    type="email"
                                    autoComplete="email"
                                    placeholder='Enter your registered Email ID'
                                    onChange={(e) => setUserEmail(e.target.value.toLowerCase())}
                                    className={"block text-lg w-full rounded-md py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" +
                                        (!isValidEmail && userEmail ? ' ring-red-500' : isValidEmail && userEmail ? ' ring-green-500' : ' ring-bGray')}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-md font-medium leading-6 text-black">
                                    Password
                                </label>
                                <div className="text-md">
                                    <Link replace={true} href={"/forgot-password"} className="font-medium text-blue-600 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder='Enter your Password'
                                    className={"block text-lg w-full rounded-md border-0 py-2 px-2 text-black shadow-sm ring-1 ring-inset ring-bGray placeholder:text-gray-400 sm:text-md sm:leading-6 !outline-none" + (!isValidPassword && userPassword ? ' ring-red-500' : isValidPassword && userPassword ? ' ring-green-500' : ' ring-bGray')}
                                    onChange={(e) => setUserPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            {isLoading == false ? <input
                                value="Sign In"
                                type="submit"
                                disabled={(!isValidEmail || !isValidPassword)}
                                className={"w-full text-lg rounded-lg bg-black text-white p-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"} /> :
                                <input
                                    value="Loading..."
                                    type="submit"
                                    disabled={true}
                                    className={"w-full text-lg rounded-lg bg-black text-white p-2 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"} />
                            }
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </>;
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import 'material-icons/iconfont/material-icons.css';
import { FIRST_ROUND_SUBMISSIONS_URL, LOGIN_URL, MARK_SEEN_URL, MARK_UNSEEN_URL } from "@/components/constants";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Navbar";

export default function RoundOneSubmissionsScreen() {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const [submissionData, setSubmissionData] = useState([]);
    const [filteredSubmissionData, setFilteredSubmissionData] = useState([]);

    useEffect(() => {
        if (typeof (secureLocalStorage.getItem('anokha-t')) !== 'string') {
            secureLocalStorage.clear();
            router.push('/intel-admin/login');
            return;
        }

        fetch(FIRST_ROUND_SUBMISSIONS_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${secureLocalStorage.getItem('anokha-t')}`,
            }
        }).then((response) => {
            switch (response.status) {
                case 200:
                    response.json().then((data) => {
                        setSubmissionData(data["submissions"]);
                        setFilteredSubmissionData(data["submissions"]);
                    });
                    break;

                case 401:
                    alert("Session expired, please login again");
                    secureLocalStorage.clear();
                    router.push('/intel-admin/login');
                    break;

                case 400:
                    response.json().then((data) => {
                        alert(data.MESSAGE);
                    })
                    break;

                default:
                    alert('Something went wrong, please try again later');
                    break;
            }
        }).catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong, please try again later');
        }).finally(() => {
            setIsLoading(false);
        })

    }, [router]);

    const [seenStatus, setSeenStatus] = useState('-1');
    const [searchText, setSearchText] = useState('');
    const [themeFilter, setThemeFilter] = useState('-1');

    useEffect(() => {
        if (submissionData.length > 0) {
            setFilteredSubmissionData(submissionData.filter((submission) => {
                return (seenStatus === "-1" || submission.seenStatus === seenStatus) &&
                    (themeFilter === "-1" || submission.theme === themeFilter) &&
                    (searchText === "" || submission.teamName.toLowerCase().includes(searchText.toLowerCase()));
            }));
        }
    }, [seenStatus, submissionData, searchText, themeFilter]);


    const markSeen = (teamId, round) => {
        setIsLoading(true);
        fetch(`${MARK_SEEN_URL}/${teamId}-${round}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${secureLocalStorage.getItem('anokha-t')}`,
            }
        }).then((response) => {
            switch (response.status) {
                case 200:
                    // Marked as seen
                    setFilteredSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '1';
                        }
                        return submission;
                    }));
                    setSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '1';
                        }
                        return submission;
                    }));
                    break;
                case 304:
                    // Marked as seen
                    setFilteredSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '1';
                        }
                        return submission;
                    }));
                    setSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '1';
                        }
                        return submission;
                    }));
                    break;
                case 401:
                    alert("Session expired, please login again");
                    secureLocalStorage.clear();
                    router.push('/intel-admin/login');
                    break;

                case 400:
                    response.json().then((data) => {
                        alert(data.MESSAGE);
                    })
                    break;

                default:
                    alert('Something went wrong, please try again later');
                    break;
            }
        }).catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong, please try again later');
        }).finally(() => {
            setIsLoading(false);
        });
    }

    const markUnseen = (teamId, round) => {
        setIsLoading(true);
        fetch(`${MARK_UNSEEN_URL}/${teamId}-${round}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${secureLocalStorage.getItem('anokha-t')}`,
            }
        }).then((response) => {
            switch (response.status) {
                case 200:
                    // Marked as unseen
                    setFilteredSubmissionData(filteredSubmissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '0';
                        }
                        return submission;
                    }));
                    setSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '0';
                        }
                        return submission;
                    }));

                    break;

                case 304:
                    // Marked as unseen
                    setFilteredSubmissionData(filteredSubmissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '0';
                        }
                        return submission;
                    }));
                    setSubmissionData(submissionData.map((submission) => {
                        if (submission.teamId === teamId) {
                            submission.seenStatus = '0';
                        }
                        return submission;
                    }));

                    break;

                case 401:
                    alert("Session expired, please login again");
                    secureLocalStorage.clear();
                    router.push('/intel-admin/login');
                    break;

                case 400:
                    response.json().then((data) => {
                        alert(data.MESSAGE);
                    })
                    break;

                default:
                    alert('Something went wrong, please try again later');
                    break;
            }
        }).catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong, please try again later');
        }).finally(() => {
            setIsLoading(false);
        });
    }





    return <>
        <NavBar />
        <main className="h-full">
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

            <h1 className="mb-8 pt-8 text-2xl text-lime-50 text-center">Submissions | Round One</h1>

            {/* teamId, teamName, teamStatus, seenStatus, problemStatement, pptFileLink, githubLink, youtubeVideoLink, devmeshLink */}
            {/* Build a table */}
            {/* teamStatus: 0 = Disqualified, 1 = Registered, 2 = Qualified for Round 2, 3 = Qualified for Round 3 */}
            {/* theme: 0:GenAI, 1:IOT, 2:Healthcare, 3:AutonomousVehicles, 4:CyberSecurity, 5:OpenEnded */}

            {/* Search */}
            <div className="flex flex-row justify-center mb-8 ml-auto mr-auto">
                <input
                    type="text"
                    placeholder="Search by Team Name"
                    className="border-gray-500 p-2 rounded-l-xl w-1/5"
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                    }}
                />
                <button className="hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r-xl bg-gray-500" onClick={() => {
                    setSearchText('');
                }
                }>
                    Clear
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-row justify-center mb-8">
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l-xl" + (seenStatus === "-1" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setSeenStatus('-1');
                }}>All</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (seenStatus === "1" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setSeenStatus('1');
                }}>Seen</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (seenStatus === "0" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setSeenStatus('0');
                }}>Not Seen</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r-xl" + (seenStatus === "2" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setSeenStatus('2');
                }}>Submission Edited by Student</button>
            </div>

            {/* Theme */}
            <div className="flex flex-row justify-center mb-8">
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-l-xl" + (themeFilter === "-1" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('-1');
                }}>All</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (themeFilter === "0" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('0');
                }}>GenAI</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (themeFilter === "1" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('1');
                }}>IOT</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (themeFilter === "2" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('2');
                }}>Healthcare</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (themeFilter === "3" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('3');
                }}>AutonomousVehicles</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4" + (themeFilter === "4" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('4');
                }}>CyberSecurity</button>
                <button className={"hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r-xl" + (themeFilter === "5" ? " bg-gray-700" : " bg-gray-500")} onClick={() => {
                    setThemeFilter('5');
                }}>OpenEnded</button>
            </div>

            {isLoading === true ? <p className="text-center">Loading...</p> : filteredSubmissionData.length === 0 ? <p className="text-center text-lime-50">No submissions yet</p> : (
                <table className="text-black ml-auto mr-auto border-collapse mb-16">
                    <thead className="">
                        <tr>
                            <th className="text-center p-2 bg-black text-white rounded-tl-xl">Team ID</th>
                            <th className="text-center p-2 bg-black text-white">Team Name</th>
                            <th className="text-center p-2 bg-black text-white">Round</th>
                            <th className="text-center p-2 bg-black text-white">Theme</th>
                            <th className="text-center p-2 bg-black text-white">PPT</th>
                            <th className="text-center p-2 bg-black text-white">GitHub</th>
                            <th className="text-center p-2 bg-black text-white">YouTube</th>
                            <th className="text-center p-2 bg-black text-white">Devmesh</th>
                            <th className="text-center p-2 bg-black text-white">Status</th>
                            <th className="text-center p-2 bg-black text-white rounded-tr-xl">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissionData.map((submission, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border p-1 text-center bg-white">{submission.teamId}</td>
                                    <td className="border p-1 text-center bg-white">{submission.teamName}</td>
                                    <td className="border p-2 text-center bg-white">
                                        {submission.teamStatus === '0' ?
                                            <p className="bg-red-100 text-red-800 p-1 rounded-lg">Disqualified</p>
                                            : submission.teamStatus === '1' ?
                                                <p className="bg-blue-100 text-blue-800 p-1 rounded-lg">Round 1</p>
                                                : submission.teamStatus === '2' ?
                                                    <p className="bg-purple-100 text-purple-800 p-1 rounded-lg">Round 2</p>
                                                    : submission.teamStatus === '3' ?
                                                        <p className="bg-green-100 text-green-800 p-1 rounded-lg">Round 3</p> : "-"}
                                    </td>
                                    <td className="border p-1 text-center bg-white">
                                        {submission.theme === '0' ? "GenAI" : submission.theme === '1' ? "IOT" : submission.theme === '2' ? "Healthcare" : submission.theme === '3' ? "Autonomous Vehicles" : submission.theme === '4' ? "CyberSecurity" : "OpenEnded"}
                                    </td>

                                    <td className="border p-1 text-center bg-white">
                                        <Link className={typeof (submission.pptFileLink) === "string" ? "underline text-blue-700" : ""} href={submission.pptFileLink ?? ""} target="_blank">
                                            {typeof (submission.pptFileLink) === "string" ? "PPT" : "-"}
                                        </Link>
                                    </td>

                                    <td className="border p-1 text-center bg-white">
                                        <Link className={typeof (submission.githubLink) === "string" ? "underline text-blue-700" : ""} href={submission.githubLink ?? ""} target="_blank">
                                            {typeof (submission.githubLink) === "string" ? "Github" : "-"}
                                        </Link>
                                    </td>
                                    <td className="border p-1 text-center bg-white">
                                        <Link className={typeof (submission.youtubeVideoLink) === "string" ? "underline text-blue-700" : ""} href={submission.youtubeVideoLink ?? ""} target="_blank">
                                            {typeof (submission.youtubeVideoLink) === "string" ? "Youtube" : "-"}
                                        </Link>
                                    </td>
                                    <td className="border p-1 text-center bg-white">
                                        <Link className={typeof (submission.devmeshLink) === "string" ? "underline text-blue-700" : ""} href={submission.devmeshLink ?? ""} target="_blank">
                                            {typeof (submission.devmeshLink) === "string" ? "DevMesh" : "-"}
                                        </Link>
                                    </td>
                                    <td className="border p-1 text-center bg-white">
                                        {submission.seenStatus === '1' ?
                                            <p className="bg-green-100 text-green-800 p-1 rounded-lg">Review Done</p>
                                            : submission.seenStatus === '2' ?
                                                <p className="bg-yellow-100 text-yellow-800 p-1 rounded-lg">Submission Edited</p>
                                                : <p className="bg-red-100 text-red-800 p-1 rounded-lg">Not Seen</p>}
                                    </td>
                                    <td className="border p-1 text-center bg-white">
                                        {/* If not seen or edited, mark as seen, else mark as unread */}
                                        {submission.seenStatus === '0' || submission.seenStatus === '2' ? (
                                            <button onClick={() => {
                                                markSeen(submission.teamId, 1);
                                            }}
                                                className="bg-purple-100 text-purple-800 p-1 rounded-lg">Mark as Reviewed</button>
                                        ) : <button onClick={() => {
                                            markUnseen(submission.teamId, 1);
                                        }} className="bg-red-100 text-red-800 p-1 rounded-lg">Mark as not Reviewed</button>
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}

        </main>
    </>;
}

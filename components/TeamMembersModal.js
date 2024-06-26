import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

export default function DialogModal({
    closeModal, title, teamData, buttonLabel, isOpen, teamName
}) {
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-lg font-medium leading-6 text-gray-900">{teamName}</h3>
                                            <p className="text-sm text-gray-500">Total: {teamData.length} members</p>
                                        </div>
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        {/* Content */}
                                        {/* Make a table. Name, Role, Mail, Phone Number */}
                                        <hr className="my-2" />
                                        <table className="table-auto w-full border mt-2 text-sm">
                                            <thead>
                                                <tr>
                                                    <th className="border px-4 py-2">Name</th>
                                                    <th className="border px-4 py-2">Contact</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {teamData.map((member, index) => (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">
                                                            <p>{member.studentFullName}</p>
                                                            <p className="text-xs text-gray-500">{member.isLeader === '1' ? "Team Lead" : "Member"}</p>
                                                        </td>
                                                        <td className="border px-4 py-2">
                                                            <p>{member.studentEmail}</p>
                                                            <p className="text-xs text-gray-500">{member.studentPhone}</p>
                                                            <p className="text-xs text-gray-500">{member.studentCollegeName}</p>
                                                            <p className="text-xs text-gray-500">{member.studentCollegeCity}</p>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 w-full"
                                            onClick={closeModal}
                                        >
                                            {buttonLabel}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

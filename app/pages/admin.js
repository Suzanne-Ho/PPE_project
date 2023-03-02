import Head from 'next/head'
import Layout from '../components/Layout.js'
import Image from 'next/image'
import {supabase} from "./api/supabase";
import Link from "next/link";
import React from "react";


export async function getStaticProps(ctx) {

    let prizes = []
    let {data, error, status} = await supabase
        .from('prizes')
        .select(`*`)
        .order('id')
    if (!error) prizes = data // handle errors
    return {
        props: {
            prizes: prizes
        }
    };
}

export default function Admin({prizes}) {
    return (
        <Layout>
            <Head>
                <title>Edubet - Admin Dashboard</title>
                <meta name="description" content="WebTech about us page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="flex py-3 px-2 items-center">
                <h1 className="text-2xl font-semibold">
                    ADMIN DASHBOARD
                </h1>
            </div>

            <div className="grid grid-cols-12 gap-6 mt-5">
                <Link className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                   href="/admin/contacts">
                    <div className="p-5">
                        <div className="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="h-7 w-7 text-blue-400">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                            </svg>

                            <div
                                className="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                <span className="flex items-center"></span>
                            </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                            <div>
                                <div className="mt-3 text-3xl font-bold leading-8">Contacts</div>

                                <div className="mt-1 text-base text-gray-600">Gérer les messages</div>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                   href="#">
                    <div className="p-5">
                        <div className="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="h-7 w-7 text-red-400">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                            </svg>

                            <div
                                className="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                <span className="flex items-center"></span>
                            </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                            <div>
                                <div className="mt-3 text-3xl font-bold leading-8">Reports</div>

                                <div className="mt-1 text-base text-gray-600">Gérer les reports</div>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                   href="#">
                    <div className="p-5">
                        <div className="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="h-7 w-7 text-yellow-400">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>
                            </svg>
                            <div
                                className="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                <span className="flex items-center"></span>
                            </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                            <div>
                                <div className="mt-3 text-3xl font-bold leading-8">Association</div>

                                <div className="mt-1 text-base text-gray-600">Gérer les membres du bureau</div>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link className="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                   href="#">
                    <div className="p-5">
                        <div className="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" className="h-7 w-7 text-green-400">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                            </svg>
                            <div
                                className="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                <span className="flex items-center"></span>
                            </div>
                        </div>
                        <div className="ml-2 w-full flex-1">
                            <div>
                                <div className="mt-3 text-3xl font-bold leading-8">Cours</div>

                                <div className="mt-1 text-base text-gray-600">Ajouter des cours</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            <div className="col-span-12 mt-5">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                    <div className="bg-white p-4 shadow-lg rounded-lg">
                        <h1 className="font-bold text-base">Table</h1>
                        <div className="mt-4">
                            <div className="flex flex-col">
                                <div className="-my-2 overflow-x-auto">
                                    <div className="py-2 align-middle inline-block min-w-full">
                                        <div
                                            className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead>
                                                <tr>
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        <div className="flex cursor-pointer">
                                                            <span className="mr-2">NOM RECOMPENSE</span>
                                                        </div>
                                                    </th>
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        <div className="flex cursor-pointer">
                                                            <span className="mr-2">Stock</span>
                                                        </div>
                                                    </th>
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        <div className="flex cursor-pointer">
                                                            <span className="mr-2">PRIX</span>
                                                        </div>
                                                    </th>
                                                    <th
                                                        className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        <div className="flex cursor-pointer">
                                                            <span className="mr-2">ACTION</span>
                                                        </div>
                                                    </th>
                                                </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">
                                                {prizes.map((prize) => (
                                                    <tr key={prize.id}>
                                                        <td
                                                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                            <p>{prize.name}</p>
                                                        </td>
                                                        <td
                                                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                            <p>{prize.quantity}</p>
                                                        </td>
                                                        <td
                                                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                            <p>{prize.price}</p>
                                                        </td>
                                                        <td
                                                            className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                            <div className="flex space-x-4">
                                                                <Link href="#"
                                                                   className="text-blue-500 hover:text-blue-600">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="w-5 h-5 mr-1"
                                                                         fill="none" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path stroke-linecap="round"
                                                                              stroke-linejoin="round"
                                                                              stroke-width="2"
                                                                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                                                    </svg>
                                                                </Link>
                                                                <Link href="#" className="text-red-500 hover:text-red-600">
                                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                                         className="w-5 h-5 mr-1 ml-3"
                                                                         fill="none" viewBox="0 0 24 24"
                                                                         stroke="currentColor">
                                                                        <path stroke-linecap="round"
                                                                              stroke-linejoin="round"
                                                                              stroke-width="2"
                                                                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

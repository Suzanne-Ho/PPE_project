import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import {supabase} from './api/supabase'
import md from "markdown-it";

export default function Posts({profiles}) {
    return (<Layout>
        <Head>
            <title>Edubet - Classement</title>
            <meta name="description" content="Edubet web application"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
            Classement
        </h1>

        <div className="flex flex-wrap my-5">

            {/* Display students */}

            <section className="container px-4 mx-auto">
                <div className="flex flex-col mt-6">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div
                                className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-x-3 focus:outline-none">
                                                <span>Email</span>
                                            </div>
                                        </th>

                                        <th scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Educoins
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {profiles.map(profile => (
                                        <tr key={profile.id}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white ">{profile.user_email}</h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div
                                                    className="inline px-3 py-1 text-sm font-normal rounded-full text-neutralText gap-x-2 bg-primaryBg">
                                                    {/*profile.educoin*/}
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
            </section>
        </div>

    </Layout>)
}

export async function getStaticProps(ctx) {

    let profiles = []
    let {data, error, status} = await supabase
        .from('profiles')
        .select(`*`)
        //.order('educoin', {ascending: true})
    if (!error) profiles = data // handle errors
    return {
        props: {
            profiles: profiles
        }
    };
}

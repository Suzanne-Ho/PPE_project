import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import {supabase} from './api/supabase'
import md from "markdown-it";

export default function Posts({posts}) {
    return (<Layout>
        <Head>
            <title>Edubet - Forum</title>
            <meta name="description" content="Edubet forum page"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
            Forum
        </h1>
        <div className='flex justify-center'>
            <button
                className="flex rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                     stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"/>
                </svg>
                <Link href="/newPost" className="ml-2">Écrire une question</Link>
            </button>
        </div>
        <div className="flex flex-wrap my-5">

            {/* Display posts */}

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
                                                <span>Titre</span>
                                            </div>
                                        </th>

                                        <th scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Matière
                                        </th>

                                        <th scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Promotion
                                        </th>

                                        <th scope="col"
                                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Contenu
                                        </th>

                                        <th scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Auteur
                                        </th>

                                        <th scope="col"
                                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            Date
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody
                                        className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {posts.map(post => (
                                        <tr key={post.id}>
                                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                <div>
                                                    <h2 className="font-medium text-gray-800 dark:text-white "><Link href={`/posts/${post.id}`}>{post.title}</Link></h2>
                                                </div>
                                            </td>
                                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                                <div
                                                    className="inline px-3 py-1 text-sm font-normal rounded-full text-neutralText gap-x-2 bg-primaryBg">
                                                    {post.subject}
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200">
                                                        {post.promotion}
                                                    </h4>
                                                </div>
                                            </td>

                                            <td className="px-12 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <p className="truncate text-gray-500 dark:text-gray-400">
                                                        {post.message}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200">
                                                        {post.author}
                                                    </h4>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div>
                                                    <h4 className="text-gray-700 dark:text-gray-200">
                                                        {post.created_at}
                                                    </h4>
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

export async function getServerSideProps(ctx) {
    let posts = []
    let { data, error, status } = await supabase
        .from('posts')
        .select('*')

    if (!error) {
        posts = data
    } else {
        console.error(error)
    }

    return {
        props: {
            posts
        }
    }
}

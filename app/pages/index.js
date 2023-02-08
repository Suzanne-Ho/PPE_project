import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import React from 'react'

import md from "markdown-it";

export default function Home({
    posts
}) {

    return (
        <Layout>
            <Head>
                <title>WebTech</title>
                <meta name="description" content="Web technologies blogging application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8">
                Welcome to our
                <mark className="ml-2 flex px-2 text-onNeutralTitle rounded bg-onPrimaryBg">
                    blog
                </mark>
                !
            </h1>
            <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
                Discover stories and thinking here on our blog. You can also write your own article!
            </p>

            {/* "Card" */}
            <div className="flex justify-center p-5">
                <Link href="/posts"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Discovert the forum
                    </h5>
                    <p className="font-normal text-gray-700">
                        Here you can find many entertaining shared articles.
                    </p>
                </Link>
                <Link href="/about"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        About us
                    </h5>
                    <p className="font-normal text-gray-700">
                        If you want to know more about us.
                    </p>
                </Link>
                <Link href="/contact"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Contact us
                    </h5>
                    <p className="font-normal text-gray-700">
                        For any problem or other thing, don t hesitate to contact us.
                    </p>
                </Link>
            </div>

            {/* Last Articles List
            <div className="flex flex-wrap my-5">
                <h5 className="mb-0 text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl leading-none text-neutralTitle pb-0">
                    Latest Articles
                </h5>
                {posts.map(article => (
                    <div key={post.slug}
                        className="w-full overflow-hidden shadow ring-1 ring-onNeutralBg ring-opacity-5 md:rounded-lg my-5">
                        <div className="bg-colorElementBg">
                            <dl className="px-3 py-4 [&_dt]:italic [&_dt]:text-neutralText [&_dt]:pr-3">
                                <div className='flex justify-between'>
                                    <div>
                                        <dt>Title</dt>
                                        <dd className="mb-2 text-2xl font-bold tracking-tight text-neutralTitle hover:text-onPrimaryBg">
                                            <Link href={`/posts/${article.id}`}>{post.title}</Link></dd>
                                    </div>
                                    <div>
                                        <dt>Category</dt>
                                        <dd className="mb-2 text-sm font-medium text-neutralText">{post.subject}</dd>
                                    </div>
                                </div>
                            </dl>
                            <div className="px-3 py-4">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-neutralText">By</dt>
                                        <dd className="mt-1 text-sm text-neutralText">{post.author}</dd>
                                    </div>
                                </dl>

                            </div>

                        </div>
                        <div className="px-3 py-10 bg-colorElementBg2">
                            <div className="text-neutralText truncate" dangerouslySetInnerHTML={{ __html: md().render(post.message) }} />
                        </div>
                    </div>
                ))}
            </div>*/}

        </Layout>
    )
}

export async function getServerSideProps() {
    let { data: artciles } = await supabase
        .from('articles')
        .select('*')
    let { data: articles } = await supabase
        .from('articles')
        .select(`id,slug,title, message, author,categorie`)
        .order("id", { ascending: false })
        .limit(3)
    return {
        props: {
            articles: articles
        }
    };
}


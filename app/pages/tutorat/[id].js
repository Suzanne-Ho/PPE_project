import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import { supabase } from '../api/supabase.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import UserContext from '../../components/UserContext.js'
import { useContext } from 'react'
import { useRouter } from 'next/router'


export default function Lesson({lesson}) {

    const router = useRouter()
    const { user } = useContext(UserContext)
    const state = { button: 1 }
    const supabase = useSupabaseClient()
    const [message, setMessage] = useState(null)
    const [lessons, setLessons] = useState([])

    useEffect(() => {
        (async () => {
            let { data, error, status } = await supabase
                .from('lessons')
                .select(`*`)
            setLessons(data)
        })()
    }, [supabase])

    /* Delete lesson */
    const DeleteLesson = async function (e) {
        e.preventDefault()
        if (state.button === 1) {
            const { error } = await supabase
                .from('lessons')
                .delete()
                .eq('id', lesson.id)
            if (error) {
                setMessage('Sorry, an unexpected error occured.')
            } else {
                setMessage(
                    <div>
                        <h2 className="text-center mt-3">Confirmation</h2>
                        <p>Your post has been successfully deleted.</p>
                    </div>
                )
                location.href = '/tutorat'
            }
        } else {
            setMessage(
                <div>
                    <h2 className="text-center mt-3">Error</h2>
                    <p>Sorry, deletion canceled</p>
                </div>
            )
            e.target.reset()
        }
    }

    return (
        <Layout>
            <Head>
                <title>Edubet - {lesson.title}</title>
                <meta name="description" content="WebTech posts page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* Post information */}
            <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
                {lesson.title}
            </h1>
            <div className="flex justify-between">
                <div>
                    <p className="mb-3 font-light text-neutralText">
                        Published by:
                        {lesson.author}
                    </p>
                    <p className="mb-3 font-light text-neutralText">
                        Published on:
                        {lesson.created_at}
                    </p>
                    <p className="mb-3 font-light text-neutralText">
                        Subject:
                        {lesson.subject}
                    </p>
                </div>
                {/* Edit button */}
                {
                    user && user.email === lesson.author ?
                        <div className="grid grid-cols-2 gap-4 content-start">
                            <button
                                className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
                                <Link href={`/posts/editPost/${lesson.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                </Link>
                            </button>
                            <button
                                className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                onClick={DeleteLesson}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button>

                        </div> :
                        null
                }
            </div>
            {/* Post content */}
            <p className="mb-3 my-3 text-neutralText">
                {lesson.message}
            </p>

        </Layout>
    )
}

export async function getStaticProps(ctx) {
    let lesson = {}
    let { data, error, status } = await supabase
        .from('lessons')
        .select(`*`)
        .eq('id', ctx.params.id)
        .single()
    if (!error) lesson = data // handle errors
    return {
        props: {
            lesson: lesson
        }
    };
}

export async function getStaticPaths(ctx) {
    let lessons = []
    let { data, error, status } = await supabase
        .from('lessons')
        .select(`id`)
    if (!error) lessons = data // handle errors
    return {
        paths: lessons.map(lesson => `/tutorat/${lesson.id}`),
        fallback: false
    };
}
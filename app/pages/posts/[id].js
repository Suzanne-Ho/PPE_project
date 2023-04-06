import {useEffect, useState} from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/Layout.js'
import {supabase} from '../api/supabase.js'
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import UserContext from '../../components/UserContext.js'
import {useContext} from 'react'
import {useRouter} from 'next/router'
import {Disclosure, Transition} from "@headlessui/react";


export default function Post({
                                 post, comments
                             }) {

    const router = useRouter()
    const {user} = useContext(UserContext)
    const state = {button: 1}
    const supabase = useSupabaseClient()
    const [message, setMessage] = useState(null)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            let {data, error, status} = await supabase
                .from('posts')
                .select(`id, message, title`)
            setPosts(data)
        })()
    }, [supabase])

    /* Delete post */
    const DeletePost = async function (e) {
        e.preventDefault()
        if (state.button === 1) {
            const {error} = await supabase
                .from('posts')
                .delete()
                .eq('id', post.id)
            if (error) {
                setMessage('Sorry, an unexpected error occured.')
            } else {
                setMessage(
                    <div>
                        <h2 className="text-center mt-3">Confirmation</h2>
                        <p>Your post has been successfully deleted.</p>
                    </div>
                )
                location.href = '/posts'
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
    /* Delete comment */
    const onSubmit = async function (e) {
        e.preventDefault()

        const data = new FormData(e.target)
        const button = e.nativeEvent.submitter

        if (state.button === 0) {

            const {error} = await supabase
                .from('comments')
                .delete()
                .eq('id', button.value)
            if (error) {
                setMessage('Sorry, an unexpected error occured.')
            } else {
                setMessage(
                    <div>
                        <h2 className="text-center mt-3">Confirmation</h2>
                        <p>Your comment has been successfully deleted.</p>
                    </div>
                )
                router.push('/posts/' + post.id)
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

        if (state.button === 2) {
            const {error} = await supabase
                .from('comments')
                .update({comment: data.get('comment')})
                .eq('id', button.value)
            if (error) {
                setMessage('Désolé, une erreur inattendue s\'est produite.')
            } else {
                setMessage(
                    <div>
                        <h2 className="text-center mt-3">Confirmation</h2>
                        <p>Votre commentaire a été mis à jour avec succès.</p>
                    </div>
                )
                router.push('/posts/' + post.id)
            }
        }

    }
    /* Add comment */
    const onSubmitComment = async function (e) {
        e.preventDefault()
        const data = new FormData(e.target)
        var datetime = new Date();
        const {error} = await supabase
            .from('comments')
            .insert([{comment: data.get('comment'), author_email: user.email, post: post.id, created_at: datetime}
            ])
        if (error) {
            setMessage('Désolé, une erreur inattendue s\'est produite.')
        } else {
            setMessage(
                <div>
                    <h2 className="text-center mt-3">Confirmation</h2>
                    <p>Votre commentaire a été ajouté avec succès.</p>
                </div>
            )
            e.target.reset()
            location.reload();
        }
    }

    const onSubmitReport = async (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const reason = form.get('reason');
        const body = form.get('body');

        const res = await fetch(`/api/posts/${post.id}/report`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reason, body }),
        });

        if (res.status === 201) {
            setReportVisible(false);
            alert('Post has been reported');
        } else {
            alert('Failed to report post');
        }
    }

    return (
        <Layout>
            <Head>
                <title>Edubet - {post.title}</title>
                <meta name="description" content="WebTech posts page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/* Post information */}
            <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
                {post.title}
            </h1>
            <div className="flex justify-between">
                <div>
                    <p className="mb-3 font-light text-neutralText">
                        Publié par:
                        {post.author}
                    </p>
                    <p className="mb-3 font-light text-neutralText">
                        Publié le:
                        {post.created_at}
                    </p>
                    <p className="mb-3 font-light text-neutralText">
                        Matière:
                        {post.subject}
                    </p>
                </div>
                {/* Edit button */}
                {
                    user && user.email === post.author ?
                        <div className="grid grid-cols-2 gap-4 content-start">
                            <button
                                className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
                                <Link href={`/posts/editPost/${post.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                    </svg>
                                </Link>
                            </button>
                            <button
                                className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                onClick={DeletePost}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5"
                                     stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                </svg>
                            </button>

                        </div> :
                        null
                }
            </div>
            {/* Post content */}
            <p className="mb-3 my-3 text-neutralText">
                {post.message}
            </p>

            {/* Comment section */}
            {
                user ?
                    /* if Connected */
                    <section className="py-8 lg:py-16 ">
                        <div className="max-w-screen px-4">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-neutralText">
                                    Discussion
                                </h2>
                            </div>
                            <form className="mb-6 min-w-screen" onSubmit={onSubmitComment}>
                                <textarea name="comment" rows="6"
                                          className="mb-5 block p-2.5 w-full placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                          placeholder="Ecrire un commentaire..." required></textarea>
                                <button onSubmit={onSubmitComment}
                                        className="inline-flex items-center rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
                                    Commenter
                                </button>
                            </form>
                            <div className="grid grid-cols-1 divide-y">
                                {comments.map((comment) => (
                                    <article key={comment.id} className="text-base p-5">
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center">
                                                <p className="inline-flex items-center mr-3 text-sm text-neutralText">
                                                    {comment.author_email}
                                                </p>
                                                <p className="text-sm text-neutralText">
                                                    {comment.created_at}
                                                </p>
                                                {user && user.email != comment.author_email ?
                                                    <div className="ml-auto">
                                                        <button value={comment.id}
                                                                className="right-0 rounded px-1 py-1 ml-5 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                                                onClick={onSubmitReport}>
                                                            <div className="flex">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" stroke-width="1.5"
                                                                     stroke="currentColor" className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                          d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"/>
                                                                </svg>
                                                                Signaler
                                                            </div>
                                                        </button>
                                                    </div> : <></>
                                                }
                                            </div>
                                        </div>
                                        <p className="text-neutralText">
                                            {comment.comment}
                                        </p>
                                        {
                                            /* Edit and delete comment */
                                            user && user.email == comment.author_email ?
                                                <><Disclosure>
                                                    <Disclosure.Button>
                                                        <div className="text-onNeutralBg">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                                 stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                                                            </svg>
                                                        </div>
                                                    </Disclosure.Button>

                                                    <Transition
                                                        enter="transition duration-100 ease-out"
                                                        enterFrom="transform scale-95 opacity-0"
                                                        enterTo="transform scale-100 opacity-100"
                                                        leave="transition duration-75 ease-out"
                                                        leaveFrom="transform scale-100 opacity-100"
                                                        leaveTo="transform scale-95 opacity-0"
                                                    >
                                                        <Disclosure.Panel>
                                                            <form onSubmit={onSubmit}>
                                                                <label
                                                                    className="block mb-2 text-sm font-medium text-neutralText">
                                                                    <span>Edit your comment</span>
                                                                    <textarea rows="3" type="text" name="comment"
                                                                              placeholder={comment.comment}
                                                                              defaultValue={comment.comment}
                                                                              className="mb-5 block p-2.5 w-full placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"/>
                                                                </label>
                                                                <div className="flex mt-5 space-x-5">
                                                                    <button value={comment.id}
                                                                            className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                                                            onClick={() => (state.button = 2)}>
                                                                        Modifier
                                                                    </button>
                                                                    <button value={comment.id}
                                                                            className="rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                                                            onClick={() => (state.button = 0)}>
                                                                        Supprimer
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </Disclosure.Panel>
                                                    </Transition>
                                                </Disclosure>
                                                </> :
                                                null

                                        }

                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>
                    :
                    /* else not Connected */
                    <section className="py-8 lg:py-16 ">
                        <div className="max-w-screen px-4">
                            <div className="flex justify-between items-center mb-0">
                                <h2 className="text-lg lg:text-2xl font-bold text-neutralText">
                                    Discussion
                                </h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 divide-y">
                            {comments.map((comment) => (
                                <article key={comment.id} className="text-base p-5">
                                    <div className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-neutralText">
                                                {comment.author_email}
                                            </p>
                                            <p className="text-sm text-neutralText">
                                                {comment.created_at}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-neutralText">
                                        {comment.comment}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>
            }
        </Layout>
    )
}

export async function getStaticProps(ctx) {
    let post = {}
    let comments = []
    let {data, error, status} = await supabase
        .from('posts')
        .select(`id, message, title, author, subject, created_at`)
        .eq('id', ctx.params.id)
        .single()
    if (!error) post = data // handle errors
    let {data: data2, error: error2, status: status2} = await supabase
        .from('comments')
        .select(`id, comment, author_email ,created_at`)
        .eq('post', post.id)
    if (!error2) comments = data2 // handle errors
    return {
        props: {
            post: post,
            comments: comments
        }
    };
}

export async function getStaticPaths(ctx) {
    let posts = []
    let {data, error, status} = await supabase
        .from('posts')
        .select(`id`)
    if (!error) posts = data // handle errors
    return {
        paths: posts.map(post => `/posts/${post.id}`),
        fallback: false
    };
}
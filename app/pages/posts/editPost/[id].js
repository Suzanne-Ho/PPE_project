import {useEffect, useState} from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import UserContext from '../../../components/UserContext';
import {useContext} from 'react';
import {supabase} from '../../api/supabase';

export default function EditPost({posts, id}) {
    const {user} = useContext(UserContext);
    const [buttonState, setButtonState] = useState(1); // Use camelCase for state variable names
    const supabaseClient = useSupabaseClient(); // Use camelCase for variable names
    const [message, setMessage] = useState(null);

    // To have the post state and retrieve its information
    const [post, setPost] = useState(null);
    useEffect(() => {
        const fetchPost = async () => {
            const {data, error} = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                //setMessage('Désolé, une erreur inattendue s'est produite.');
            } else {
                setPost(data);
            }
        };
        fetchPost();
    }, [id, supabaseClient]); // Use supabaseClient instead of supabase to fix the lint error

    // Edit the post
    const onSubmit = async (e) => {
        e.preventDefault();
        if (buttonState === 2) {
            const data = new FormData(e.target);

            if (data.get('title') || data.get('message')) {
                var dateTime = new Date();
                const {error} = await supabaseClient
                    .from('posts')
                    .update({
                        title: data.get('title') || posts.title,
                        subject: data.get('subject') || posts.subject,
                        promotion: data.get('promotion') || posts.promotion,
                        message: data.get('message') || posts.message,
                        created_at: dateTime,
                        slug: data.get('title')
                            ? data.get('title').replace(/\s+/g, '-').toLowerCase()
                            : posts.slug, // Add the slug field to the update query
                    })
                    .eq('id', posts.id);
                if (error) {
                    setMessage('Désolé, une erreur inattendue s\'est produite.');
                } else {
                    setMessage(
                        <div>
                            <h2 className="text-center mt-3">Confirmation</h2>
                            <p>Votre message a été mis à jour avec succès.</p>
                        </div>
                    );
                    e.target.reset();
                    window.location.href = '/posts'; // Use window.location.href instead of location.href
                }
            } else {
                setMessage(
                    <div>
                        <h2 className="text-center mt-3">Error</h2>
                        <p>Tous les champs doivent être remplis.</p>
                    </div>
                );
            }
        }
    };

    return (
        posts ?
            <Layout>
                <Head>
                    <title>Edubet - Modifier</title>
                    <meta name="description" content="Edubet posts page"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
                    {posts.title}: Modifier le post
                </h1>

                {
                    /* if connected and author of the post*/
                    user && user.email == posts.author ?
                        <>
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Titre
                                        </label>
                                        <input defaultValue={posts.title} placeholder={posts.title} type="text"
                                               name="title"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Matière
                                        </label>
                                        <input defaultValue={posts.subeject} placeholder={posts.subject} type="text"
                                               name="subject"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Promotion
                                        </label>
                                        <input defaultValue={posts.promotion} placeholder={posts.promotion} type="text"
                                               name="promotion"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Contenu
                                        </label>
                                        <textarea placeholder={posts.message} rows="15" defaultValue={posts.message}
                                                  type="text" name="message"
                                                  className="placeholder-onNeutralBg block p-2.5 w-full bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                                  required></textarea>
                                    </div>
                                </div>

                                <button
                                    className="my-5 p-6 rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                    onClick={() => setButtonState(2)}>
                                    Modifier post
                                </button>

                            </form>
                            {message &&
                                <div aria-label="Overlow below the drawer dialog"
                                     className="fixed inset-0 bg-black/80 flex items-center justify-center"
                                     onClick={() => setMessage(null)} role="dialog">
                                    <div aria-label="Alert pane"
                                         className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white">
                                        {message}
                                    </div>
                                </div>
                            }</>
                        :
                        null
                }
            </Layout> : <Layout>
                <div className="text-neutralText">Chargement en cours...</div>
            </Layout>
    )
}


export async function getServerSideProps(context) {
    const id = context.query.id;

    const {data, error} = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return {notFound: true};
    }

    return {
        props: {posts: data},
    };
}

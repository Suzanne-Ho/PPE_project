import {useEffect, useState} from 'react';
import Head from 'next/head';
import Layout from '../../../components/Layout';
import {useSupabaseClient} from '@supabase/auth-helpers-react'
import UserContext from '../../../components/UserContext';
import {useContext} from 'react';
import {supabase} from '../../api/supabase';

export default function EditLesson({lessons, id}) {
    const {user} = useContext(UserContext);
    const [buttonState, setButtonState] = useState(1); // Use camelCase for state variable names
    const supabaseClient = useSupabaseClient(); // Use camelCase for variable names
    const [message, setMessage] = useState(null);

    // To have the lesson state and retrieve its information
    const [lesson, setLesson] = useState(null);
    useEffect(() => {
        const fetchLesson = async () => {
            const {data, error} = await supabase
                .from('lessons')
                .select('*')
                .eq('id', id)
                .single();
            if (error) {
                //setMessage('Désolé, une erreur inattendue s'est produite.');
            } else {
                setLesson(data);
            }
        };
        fetchLesson();
    }, [id, supabaseClient]); // Use supabaseClient instead of supabase to fix the lint error

    // Edit the lesson
    const onSubmit = async (e) => {
        e.preventDefault();
        if (buttonState === 2) {
            const data = new FormData(e.target);
            var dateTime = new Date();
            if (data.get('title') || data.get('message')) {
                const {error} = await supabaseClient
                    .from('lessons')
                    .update({
                        title: data.get('title') || lessons.title,
                        subject: data.get('subject') || lessons.subject,
                        promotion: data.get('promotion') || lessons.promotion,
                        message: data.get('message') || lessons.message,
                        created_at: dateTime
                    })
                    .eq('id', lessons.id);
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
                    window.location.href = '/tutorat'; // Use window.location.href instead of location.href
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
        lessons ?
            <Layout>
                <Head>
                    <title>Edubet - Modifier</title>
                    <meta name="description" content="Edubet lessons page"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>
                <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
                    {lessons.title}: Modifier le cours
                </h1>

                {
                    /* if connected and author of the lesson*/
                    user && user.email == lessons.author ?
                        <>
                            <form onSubmit={onSubmit}>
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Titre
                                        </label>
                                        <input defaultValue={lessons.title} placeholder={lessons.title} type="text"
                                               name="title"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Matière
                                        </label>
                                        <input defaultValue={lessons.subject} placeholder={lessons.subject} type="text"
                                               name="subject"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Promotion
                                        </label>
                                        <input defaultValue={lessons.promotion} placeholder={lessons.promotion}
                                               type="text" name="promotion"
                                               className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                               required/>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label
                                            className="block mb-2 text-sm font-medium text-neutralText">
                                            Contenu
                                        </label>
                                        <textarea placeholder={lessons.message} rows="15" defaultValue={lessons.message}
                                                  type="text" name="message"
                                                  className="placeholder-onNeutralBg block p-2.5 w-full bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                                                  required></textarea>
                                    </div>
                                </div>

                                <button
                                    className="my-5 p-6 rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText"
                                    onClick={() => setButtonState(2)}>
                                    Modifier le cours
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
        .from('lessons')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return {notFound: true};
    }

    return {
        props: {lessons: data},
    };
}

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
                <title>Edubet</title>
                <meta name="description" content="Edubet web application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8">
                Bienvenue sur
                <mark className="ml-2 flex px-2 text-onNeutralTitle rounded bg-onPrimaryBg">
                    EDUBET
                </mark>
                !
            </h1>
            <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
                Apprenez à votre rythme avec des cours en ligne de qualité supérieure. Rejoignez notre communauté d&apos;étudiants et découvrez le pouvoir de l&apos;apprentissage en ligne tout en ayant fun dès aujourd&apos;hui!
            </p>

            {/* "Card" */}
            <div className="grid grid-cols-1 gap-y-1 gap-x-6 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-3 p-5">
                <Link href="/posts"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Découvrez le forum!
                    </h5>
                    <p className="font-normal text-gray-700">
                        Trouvez des réponses à vos questions.
                    </p>
                </Link>
                <Link href="/prize"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Récompenses
                    </h5>
                    <p className="font-normal text-gray-700">
                        Découvre les prix que tu peux échanger.
                    </p>
                </Link>
                <Link href="/contact"
                    className="m-3 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                        Contactez-nous
                    </h5>
                    <p className="font-normal text-gray-700">
                        Pour tout problème ou autre, n&apos;hésitez pas à nous contacter.
                    </p>
                </Link>
            </div>

        </Layout>
    )
}


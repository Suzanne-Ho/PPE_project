import Head from 'next/head'
import Layout from '../components/Layout.js'
import Image from 'next/image'
import {supabase} from "./api/supabase";


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

export default function Prize({prizes}) {
    return (
        <Layout>
            <Head>
                <title>Edubet - Recompenses</title>
                <meta name="description" content="WebTech about us page"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
                Récompenses
            </h1>
            <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
                Echange tes points contre des récompenses.
            </p>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {prizes.map((prize) => (
                    <div key={prize.id} className="rounded overflow-hidden shadow-lg">
                        <img className="w-full" src={prize.imageSrc} alt="Prize"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{prize.name}</div>
                            <p className="text-gray-700 text-base">
                                {prize.price} Educoins
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Quantité restante: {prize.quantity}</span>

                        </div>
                    </div>

                ))}
            </div>

        </Layout>
    )
}

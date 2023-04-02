import Head from 'next/head'
import Layout from '../components/Layout.js'
import {supabase} from "./api/supabase";
import Link from "next/link";

export default function Tutorat({lessons}) {
  return (
    <Layout>
      <Head>
        <title>Edubet - tutorat</title>
        <meta name="description" content="Edubet about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
        Tutorat
      </h1>
      <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
          Choisis le cours que tu souhaite suivre parmi ceux qu&apos;on te propose.
      </p>


        <div className="pt-6 pb-12">
            <div>
                <h2 className="text-center font-serif  uppercase text-3xl xl:text-6xl mt-10">Cours récents</h2>

                <div className="container w-100 lg:w-4/5 mx-auto flex flex-col">

                    {lessons.map((lesson) => (
                        <Link key={lesson.id} href={`/tutorat/${lesson.id}`}>
                            <div  className="flex flex-col md:flex-row overflow-hidden bg-white border border-gray-200 rounded-lg shadow-xl  mt-4 w-100 mx-2">

                                <div className="w-full py-4 px-6 text-gray-800 flex flex-col justify-between">
                                    <div className='flex justify-between'>
                                        <div>
                                            <h3 className="font-semibold text-lg leading-tight truncate">{lesson.title}</h3>
                                        </div>
                                        <div>
                                            {lesson.promotion}
                                        </div>
                                    </div>
                                    <p className="text-sm font- text-gray-700 uppercase tracking-wide font-semibold mt-2">
                                        {lesson.subject}
                                    </p>
                                    <p className="mt-5">
                                        {lesson.description}
                                    </p>
                                    <p className="text-xs text-gray-700 uppercase tracking-wide font-semibold mt-5">
                                        {lesson.author} &bull; {lesson.created_at}
                                    </p>

                                </div>
                            </div>
                        </Link>


                    ))}

                </div>

            </div>
        </div>

    </Layout>
  )
}

export async function getStaticProps(ctx) {

    let lessons = []
    let { data, error, status } = await supabase
        .from('lessons')
        .select(`*`)
    if (!error) lessons = data // handle errors
    return {
        props: {
            lessons: lessons
        }
    };
}


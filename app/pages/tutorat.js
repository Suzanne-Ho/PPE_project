import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function Tutorat() {
  return (
    <Layout>
      <Head>
        <title>Edubet - tutorat</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
        Tutorat
      </h1>
      <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
        Choisis le cours que tu souhaite suivre parmis ceux qu on te propose.
      </p>
    </Layout>
  )
}

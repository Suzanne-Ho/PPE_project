import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function Prize() {
  return (
    <Layout>
      <Head>
        <title>Edubet - Prize</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
        Prize
      </h1>
      <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
        Exchange your point for prize.
      </p>
    </Layout>
  )
}

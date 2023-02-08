import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function About() {
  return (
    <Layout>
      <Head>
        <title>WebTech - about us</title>
        <meta name="description" content="WebTech about us page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
        About us
      </h1>
      <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
        We are two students from ECE Paris working on a project for the WebTech course.
        This app is like our blog so you can find some articles that we wanted to share with you.
        Feel free to add your own articles. It can be anything. We hope you will enjoy it.
        You can also contact us if you have any problem.
      </p>
    </Layout>
  )
}

import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/Layout.js'
import { supabase } from './api/supabase'
import md from "markdown-it";

export default function Posts({
  posts
}) {
  return (
    <Layout>
      <Head>
        <title>Forum - posts</title>
        <meta name="description" content="WebTech articles page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
        Welcome to the forum !
      </h1>
      <div className='flex justify-center'>
        <button className="flex rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
          <Link href="/newPost" className="ml-2">Write a a new post</Link>
        </button>
      </div>
      <div className="flex flex-wrap my-5">

        {/* Display posts */}

        {posts.map(post => (
          <div key={post.id}
            className="w-full overflow-hidden shadow ring-1 ring-onNeutralBg ring-opacity-5 md:rounded-lg my-5">
            <div className="bg-colorElementBg">
              <dl className="px-3 py-4 [&_dt]:italic [&_dt]:text-neutralText [&_dt]:pr-3">
                <div className='flex justify-between'>
                  <div>
                    <dt>Title</dt>
                    <dd className="mb-2 text-2xl font-bold tracking-tight text-neutralTitle hover:text-onPrimaryBg">
                      <Link href={`/posts/${post.id}`}>{post.title}</Link></dd>
                  </div>
                  <div>
                    <dt>Subject</dt>
                    <dd className="mb-2 tracking-tight text-neutralText hover:text-onPrimaryBg">
                      {post.categorie}</dd>
                  </div>
                </div>
              </dl>
              <div className="px-3 py-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-neutralText">By</dt>
                    <dd className="mt-1 text-sm text-neutralText">{post.author}</dd>
                  </div>
                </dl>

              </div>

            </div>
            <div className="px-3 py-10 bg-colorElementBg2">
              <div className="text-neutralText truncate" dangerouslySetInnerHTML={{ __html: md().render(post.message) }} />
            </div>
          </div>
        ))}
      </div>

    </Layout>
  )
}

export async function getStaticProps(ctx) {

  let posts = []
  let { data, error, status } = await supabase
    .from('posts')
    .select(`id, message, title, author, subject`)
  if (!error) posts = data // handle errors
  return {
    props: {
        posts: posts
    }
  };
}

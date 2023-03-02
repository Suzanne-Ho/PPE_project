import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import UserContext from '../../../components/UserContext.js'
import { useContext } from 'react'

export default function EditPost({
  slug
}) {
  const { user } = useContext(UserContext)
  const state = { button: 1 }
  const supabase = useSupabaseClient()
  const [message, setMessage] = useState(null)

  {/* To have the post state and retrieve its information */ }
  const [post, setPost] = useState(null)
  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from('posts')
        .select(`id, message, title, author`)
        .eq('id', id)
        .single()
      setPost(data)
    })()
    console.log(id)
  }, [id, supabase])

  /* Edit his post */
  const onSubmit = async function (e) {
    e.preventDefault()
    if (state.button === 2) {
      const data = new FormData(e.target)
      const { error } = await supabase

      if (data.get('title') && data.get('message')) {

        const { error } = await supabase
          .from('posts')
          .update(Object.fromEntries(data))
          .eq('id', post.id)
        data.set('id', data.get('title').replace(/\s+/g, '-').toLowerCase())
        if (error) {
          setMessage('Sorry, an unexpected error occured.')
        } else {
          setMessage(
            <div>
              <h2 className="text-center mt-3">Confirmation</h2>
              <p>Your post has been successfully updated.</p>
            </div>
          )
          e.target.reset()
          location.href = '/posts'
        }
      }
      else if (data.get('title')) {
        const { error } = await supabase
          .from('posts')
          .update({ title: data.get('title'), slug: data.get('id') })
          .eq('id', post.id)
        data.set('id', data.get('title').replace(/\s+/g, '-').toLowerCase())

        if (error) {
          setMessage('Sorry, an unexpected error occured.')
        } else {
          setMessage(
            <div>
              <h2 className="text-center mt-3">Confirmation</h2>
              <p>Your post has been successfully updated.</p>
            </div>

          )
          e.target.reset()
          location.href = '/posts'
        }
      }
      else if (data.get('message')) {
        const { error } = await supabase
          .from('posts')
          .update({ message: data.get('message') })
          .eq('id', post.id)
        if (error) {
          setMessage('Sorry, an unexpected error occured.')
        } else {
          setMessage(
            <div>
              <h2 className="text-center mt-3">Confirmation</h2>
              <p>Your post has been successfully updated.</p>
            </div>
          )
          e.target.reset()
          location.href = '/posts'
        }

      }
      else {
        setMessage(
          <div>
            <h2 className="text-center mt-3">Error</h2>
            <p>You must fill at least one field.</p>
          </div>
        )
      }
    }

  }

  return (
      post ?
      <Layout>
        <Head>
          <title>WebTech - {post.title}</title>
          <meta name="description" content="Edubet posts page" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl pb-8 text-neutralTitle'>
          {post.title}: Update post
        </h1>

        {
          /* if connected and author of the post*/
          user && user.email == post.author ?
            <>
              <form onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="sm:col-span-2">
                    <label
                      className="block mb-2 text-sm font-medium text-neutralText">
                      Title
                    </label>
                    <input defaultValue={post.title} placeholder={post.title} type="text" name="title"
                      className="placeholder-onNeutralBg bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                      required />
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      className="block mb-2 text-sm font-medium text-neutralText">
                      Content
                    </label>
                    <textarea placeholder={post.message} rows="15" defaultValue={post.message} type="text" name="message"
                      className="placeholder-onNeutralBg block p-2.5 w-full bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5"
                      required></textarea>
                  </div>
                </div>

                <button className="my-5 p-6 rounded px-3 py-2 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText" onClick={() => (state.button = 2)}>
                  Update post
                </button>

              </form>
              {message &&
                <div aria-label="Overlow below the drawer dialog" className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={() => setMessage(null)} role="dialog" >
                  <div aria-label="Alert pane" className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white">
                    {message}
                  </div>
                </div>
              }</>
            :
            null
        }


      </Layout> : <Layout><div className="text-neutralText">Loading...</div></Layout>
  )
}

export async function getServerSideProps(context) {
  console.log(context.params)
  return {
    props: {
      id: context.params.id
    },
  }
}


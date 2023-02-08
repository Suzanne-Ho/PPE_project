import { useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import Layout from '../components/Layout.js'

export default function Contact() {
  const supabase = useSupabaseClient()
  const [message, setMessage] = useState(null)

  /*add contact*/
  const onSubmit = async function (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    const { error } = await supabase
      .from('contacts')
      .insert(Object.fromEntries(data), { returning: 'minimal' })
    if (error) {
      setMessage('Sorry, an unexpected error occured.')
    } else {
      setMessage(
        <div>
          <h2 className="text-center mt-3">Confirmation</h2>
          <p>Thank you for contacting us. We will get back to you promptly.</p>
        </div>
      )
    }
  }

  return (
    <Layout>
      <Head>
        <title>WebTech - contact us</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8">
        Contact
      </h1>
      {/* form to contact us */}
      <form onSubmit={onSubmit} >
        <div className="flex justify-center">
          <label className="block mb-2 text-sm font-medium text-neutralText">
            <span>First name</span>
            <input type="text" name="firstname" className="bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5" />
          </label>
        </div>
        <div className="flex justify-center">
          <label className="block text-sm font-medium text-neutralText">
            <span>Last name</span>
            <input type="text" name="lastname" className="bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5" />
          </label>
        </div>
        <div className="flex justify-center">
          <label className="block mb-2 text-sm font-medium text-neutralText">
            <span>Email</span>
            <input type="text" name="email" className="bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5" />
          </label>
        </div>
        <div className="flex justify-center">
          <label className="block text-sm font-medium text-neutralText">
            <span>Message</span>
            <textarea name="message" className="bg-neutralBg border border-onNeutralBg text-onNeutralBg text-sm rounded-lg focus:ring-primaryBg focus:border-primaryBg block w-full p-2.5" />
          </label>
        </div>
        <div className="flex justify-center p-5">
          <button className="m-3 rounded py-1 px-3 text-neutralText bg-primaryBg hover:bg-onPrimaryBg hover:text-hoverText">
            Send
          </button>
        </div>
      </form>
      {message &&
        <div aria-label="Overlow below the drawer dialog" className="fixed inset-0 bg-black/80 flex items-center justify-center" onClick={() => setMessage(null)} role="dialog">
          <div aria-label="Alert pane" className="max-h-[90vh] max-w-[95vw] overflow-auto p-4 prose bg-white">
            {message}
          </div>
        </div>
      }
    </Layout>
  )
}

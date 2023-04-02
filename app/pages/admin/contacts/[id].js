import { useState, useEffect } from 'react'
import md from 'markdown-it'
import Head from 'next/head'
import Layout from '../../../components/Layout.js'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Contacts({
  id
}) {
  const [contact, setContact] = useState(null)
  const supabase = useSupabaseClient()
  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from('contacts')
        .select(`*`)
        .eq('id', id)
        .single()
      setContact(data)
    })()
  }, [id, supabase])
  return (
    <Layout>
      <Head>
        <title>Edubet - Contact message</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
        Voir un message
      </h1>
      {contact && (
        <div className="overflow-hidden divide-y divide-slate-200 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <div className="bg-slate-50">
            <dl className="grid grid-cols-[auto_1fr] px-3 py-4 [&_dt]:italic [&_dt]:text-slate-500 [&_dt]:pr-3">
              <dt>Nom</dt>
              <dd>{contact.lastname}, {contact.firstname}</dd>
              <dt>Email</dt>
              <dd>{contact.email}</dd>
            </dl>
          </div>
          <div className="px-3 py-10 bg-white">
            <div dangerouslySetInnerHTML={{ __html: md().render(contact.message) }} />
          </div>
        </div>
      )}
    </Layout>
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

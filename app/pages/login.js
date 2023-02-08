import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Head from 'next/head'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Layout from '../components/Layout.js'
import UserContext from '../components/UserContext'

export default function Contact() {

  const { user } = useContext(UserContext)
  const router = useRouter()
  const supabaseClient = useSupabaseClient()
  if (user) router.push('/profile')

  return (
    <Layout>
      <Head>
        <title>WebTech - user signin</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-center">
        <div className="flex justify-center block p-6 max-w-sm bg-white rounded-lg">
          <Auth
            supabaseClient={supabaseClient}
            appearance={{ theme: ThemeSupa }}
            providers={['github']}
          />
        </div>
      </div>
    </Layout>
  )
}
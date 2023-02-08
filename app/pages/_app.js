import '../styles/globals.css'
import { useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { UserContextProvider } from '../components/UserContext'
import ThemeContext from '../components/ThemeContext'

export default function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const [color, setColor] = useState();
  const [mode, setMode] = useState();

  useEffect(() => {
    setColor(localStorage.getItem('theme-color') ? localStorage.getItem('theme-color') : 'default');
    setMode(localStorage.getItem('theme-mode') ? localStorage.getItem('theme-mode') : 'light');
  }, [])

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <UserContextProvider>
        <ThemeContext.Provider
          value={{
            mode: mode,
            setMode: (mode) => setMode(mode),
            color: color,
            setColor: (color) => setColor(color)
          }}>
          <Component {...pageProps} />
        </ThemeContext.Provider>
      </UserContextProvider>
    </SessionContextProvider>
  )
}

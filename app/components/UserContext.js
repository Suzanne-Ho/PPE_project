import { createContext, useState, useEffect } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

const UserContext = createContext()

export default UserContext

export function UserContextProvider({ children }) {
    const supabaseClient = useSupabaseClient()
    const supabaseUser = useUser()
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function addProfileToDatabase(user) {
            const { user_email, id } = user
            const profile = { user_email, id }

            try {
                const { data, error } = await supabaseClient
                    .from('profiles')
                    .insert(profile)

                if (error) {
                    throw error
                }

                console.log('User profile added:', data[0])
            } catch (error) {
                console.error('Error adding user profile:', error.message)
            }
        }

        if (supabaseUser) {
            setUser(supabaseUser)
            setLoading(false)
            addProfileToDatabase(supabaseUser)
        }
    }, [supabaseClient, supabaseUser])

    return (
        <UserContext.Provider
            value={{
                user: user,
                logout: async function () {
                    await supabaseClient.auth.signOut()
                    setUser(null)
                }
            }}
        >
            {loading ? <div>Loading...</div> : children}
        </UserContext.Provider>
    )
}

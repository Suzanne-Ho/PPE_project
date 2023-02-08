import React from 'react';
import md5 from 'md5';
import { useSession } from "@supabase/auth-helpers-react";

/* Avatar.js is used to display the avatar of the user who is connected */

const BASE_URL = 'https://www.gravatar.com/avatar';
export default function Avatar() {
    const session = useSession()
    const hash = md5(session.user.email.trim().toLowerCase());
    return (
        <img src={`${BASE_URL}/${hash}`} alt="Avatar" className="avatar w-6" />
    );
}
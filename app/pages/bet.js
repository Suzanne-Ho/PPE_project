import {useState, useEffect} from "react";
import {supabase} from './api/supabase'
import React from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import UserContext from '../components/UserContext'
import {useContext} from 'react'

export default function BetPage() {
    const [bets, setBets] = useState([]);
    const {user} = useContext(UserContext)

    useEffect(() => {
        fetchBets();
    }, []);

    async function fetchBets() {
        try {
            const {data} = await supabase
                .from("bets")
                .select("*")
                .gt("until", new Date().toISOString()) // filter bets that haven't reached until date
                .order("created_at", {ascending: false});
            setBets(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function handleJoinBet(bet) {
        try {
            // get the current user's email
            const email = user.email;

            // determine which player to add the user to
            if (!bet.player1_email) {
                await supabase
                    .from("bets")
                    .update({player1_email: email})
                    .eq("id", bet.id);
            } else if (bet.player1_email === email) {
                console.log("You are already in this bet as Player 1");
            } else if (!bet.player2_email) {
                await supabase
                    .from("bets")
                    .update({player2_email: email})
                    .eq("id", bet.id);
            } else if (bet.player2_email === email) {
                console.log("You are already in this bet as Player 2");
            } else {
                console.log("This bet is already full");
            }

            // refresh the list of bets
            await fetchBets();
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <Layout>
            <Head>
                <title>Edubet - Paris</title>
                <meta name="description" content="Edubet Web application"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <h1 className='flex justify-center mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-neutralTitle pb-8'>
                Paris
            </h1>
            <p className="flex justify-center text-lg font-normal lg:text-xl text-neutralText">
                Affronte les autres joueurs.
            </p>

            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {bets.map((bet) => (
                    <div key={bet.id} className="rounded overflow-hidden shadow-lg">
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{bet.description}</div>
                            <p className="text-gray-700 text-base">
                                Joueur 1: {bet.player1_email}
                            </p>
                            <p className="text-gray-700 text-base">
                                Joueur 2: {bet.player2_email}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <span
                                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                Mise: {bet.gain}
                            </span>
                            <p className="text-gray-700 text-base">
                                Date fin: {bet.until}
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            {!bet.player2_email || !(bet.player1_email && bet.player2_email) ? (
                                <button
                                    className="bg-primaryBg hover:bg-onPrimaryBg text-neutralText hover:text-hoverText py-2 px-4 rounded"
                                    onClick={() => handleJoinBet(bet)}
                                >
                                    Rejoindre le pari
                                </button>
                            ) : null}
                        </div>
                    </div>

                ))}
            </div>

        </Layout>
    );
}

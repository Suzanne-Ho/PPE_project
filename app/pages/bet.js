import { useState, useEffect } from "react";
import {supabase} from './api/supabase'
import React from "react";
import Layout from "../components/Layout";

const Card = ({ bet }) => {
    const { player1_email, player2_email, description, gain } = bet || {};
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Joueur 1: {player1_email}</h2>
                <h2 className="text-lg font-bold">Joueur 2: {player2_email}</h2>
            </div>
            <p className="mb-4">{description}</p>
            <div className="flex justify-between items-center">
                <p className="font-bold text-gray-700">{gain}</p>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
                    Place Bet
                </button>
            </div>
        </div>
    );
};


export default function BetPage() {
    const [bets, setBets] = useState([]);

    useEffect(() => {
        fetchBets();
    }, []);

    async function fetchBets() {
        try {
            const { data } = await supabase
                .from("bets")
                .select("*")
                .gt("until", new Date().toISOString()) // filter bets that haven't reached until date
                .order("created_at", { ascending: false });
            setBets(data);
        } catch (error) {
            console.log("error", error);
        }
    }

    async function handleJoinBet(bet) {
        // get the current user's email
        const { user } = supabase.auth.session();
        const email = user.email;

        // determine which player to add the user to
        if (!bet.player1_email) {
            await supabase
                .from("bets")
                .update({ player1_email: email })
                .eq("id", bet.id);
        } else if (bet.player1_email === email) {
            console.log("You are already in this bet as Player 1");
        } else if (!bet.player2_email) {
            await supabase
                .from("bets")
                .update({ player2_email: email })
                .eq("id", bet.id);
        } else if (bet.player2_email === email) {
            console.log("You are already in this bet as Player 2");
        } else {
            console.log("This bet is already full");
        }

        // refresh the list of bets
        await fetchBets();
    }

    return (
        <Layout>
            <div className="flex flex-wrap justify-center">
                {bets.map((bet) => (
                    <Card
                        key={bet.id}
                        title={bet.description}
                        subtitle={`Created on ${new Date(bet.created_at).toLocaleDateString()}`}
                        body={`Prize: ${bet.gain}`}
                        footer={
                            <>
                                <span className="text-neutralText">{`Player 1: ${bet.player1_email}`}</span>
                                <span className="text-neutralText">{`Player 2: ${bet.player2_email}`}</span>
                                {!bet.player1_email || (bet.player1_email && bet.player2_email) ? (
                                    <button
                                        className="bg-primaryBg hover:bg-onPrimaryBg text-neutralText hover:text-hoverText py-2 px-4 rounded"
                                        onClick={() => handleJoinBet(bet)}
                                    >
                                        Join Bet
                                    </button>
                                ) : null}
                            </>
                        }
                    />
                ))}
            </div>
        </Layout>
    );
}

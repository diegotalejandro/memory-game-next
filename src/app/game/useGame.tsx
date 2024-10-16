"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCards } from '../api/card';
import { ICard } from '../types/types';
import { useGlobalContext } from '../context/GlobalContext';

export default function useGame() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedCards, setMatchedCards] = useState<ICard[]>([]);
    const [matches, setMatches] = useState<number>(0);
    const [errors, setErrors] = useState<number>(0);
    const router = useRouter();
    const { userName, screenDimensions, setLoading } = useGlobalContext();

    const asyncGetCards = async () => {
        setLoading(true);
        try {
            const cards = await getCards();
            const duplicatedCards = [...cards, ...cards];
            const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
            setCards(shuffledCards);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const handleCardClick = (index: number) => {
        if (flippedCards.length === 2) return;
        if (flippedCards.includes(index)) return;

        setFlippedCards((prev) => [...prev, index]);

        if (flippedCards.length === 1) {
            const firstCard = cards[flippedCards[0]];
            const secondCard = cards[index];

            if (firstCard.uuid === secondCard.uuid) {
                setMatchedCards((prev) => [...prev, firstCard]);
                setMatches((prev) => prev + 1);
            } else {
                setErrors((prev) => prev + 1);
            }

            setTimeout(() => {
                setFlippedCards([]);
            }, 500);
        }
    };

    const resetGame = () => {
        const shuffledCards = cards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedCards([]);
        setMatches(0);
        setErrors(0);
    };

    const showCardImage = (index: number) => {
        return flippedCards.includes(index) || matchedCards.some(matchedCard => matchedCard.uuid === cards[index].uuid);
    }

    const checkWin = () => {
        return cards.length > 0 && matchedCards.length === cards.length / 2;
    };



    useEffect(() => {
        if (!userName) {
            router.replace('/');
        }
    }, [userName, router]);

    useEffect(() => {
        asyncGetCards();
    }, []);



    return {
        // variables
        userName,
        cards,
        flippedCards,
        matchedCards,
        matches,
        errors,
        screenDimensions,
        // methods
        handleCardClick,
        resetGame,
        showCardImage,
        checkWin
    }
}

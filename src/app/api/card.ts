import { ICard } from "../types/types"

export const getCards = async () => {
    const res = await fetch('https://challenge-uno.vercel.app/api/images')

    if (!res.ok) {
        throw new Error('Failed to fetch cards')
    }

    const cards: ICard[] = await res.json()
    return cards
}


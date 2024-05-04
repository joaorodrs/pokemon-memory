import { useEffect, useState } from 'react'

import { Progress } from '@/components/ui/progress'
import PokeballSvg from '@/assets/pokeball.svg'
import pokemons from './utils/pokemons'

import './App.css'
import { Card } from './types'
import { shuffleArray } from './utils'

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [matchedCards, setMatchedCards] = useState<Card[]>([])

  function onSelectCard(card: Card) {
    if (selectedCards.length) {
      setSelectedCards(curr => [...curr, card])
      setTimeout(() => setSelectedCards([]), 1000)
    }

    if (selectedCards.map(item => item.name).includes(card.name)) {
      setMatchedCards(curr => [...curr, ...selectedCards, card])
      setSelectedCards([])
    }

    setSelectedCards(curr => [...curr, card])
  }

  function getCards() {
    const pokelist = [...pokemons, ...pokemons.map((item, index) => ({ ...item, id: index + 7 }))]

    const shuffled = shuffleArray(pokelist) as Card[]

    setCards(shuffled)
  }

  useEffect(() => {
    if (cards.length) return;

    getCards()
  }, [cards.length])

  return (
    <main className="w-screen h-screen px-9 py-12 flex flex-col md:justify-center">
      <h1 className="font-mono text-2xl text-center mx-auto md:text-4xl">Jogo da Memória</h1>
      <h2 className="mt-5 text-zinc-400 text-center mx-auto md:text-lg">Você tem 15 tentativas para encontrar todos os pokemóns</h2>

      <div className="mt-8 max-w-[600px] mx-auto w-full">
        <div className="flex justify-between items-end">
          <span className="text-sm font-extrabold md:text-md">Tentativas</span>
          <span className="text-2xl font-extrabold">5/15</span>
        </div>
        <Progress value={34} className="mt-2" />
      </div>

      <div className="flex flex-wrap mt-12 max-w-[600px] mx-auto px-3 justify-center gap-8 h-[55vh] overflow-y-auto md:h-fit md:justify-between md:gap-0 md:px-0 md:gap-y-4">
        {cards.map(item => (
          <GameCard
            {...item}
            onSelectCard={onSelectCard}
            isSelected={selectedCards.map(item => item.id).includes(item.id) || matchedCards.map(item => item.id).includes(item.id)}
          />
        ))}
      </div>
    </main>
  )
}

function GameCard({
  id,
  source,
  name,
  onSelectCard,
  isSelected
}: Card & { onSelectCard(card: Card): void, isSelected: boolean }) {
  return (
    <button
      key={String(id)}
      className="flex items-center justify-center bg-white size-32 rounded-2xl"
      disabled={isSelected}
      onClick={() => onSelectCard({ id, source, name })}
    >
      <img src={!isSelected ? PokeballSvg : source} alt={!isSelected ? 'Pokeball' : name} />
    </button>
  )
}

export default App

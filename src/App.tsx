import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GithubIcon } from 'lucide-react'

import PokeballSvg from '@/assets/pokeball.svg'

import pokemons from './utils/pokemons'
import { Card } from './types'
import { shuffleArray } from './utils'

import './App.css'

function App() {
  const [cards, setCards] = useState<Card[]>([])
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [matchedCards, setMatchedCards] = useState<Card[]>([])

  function onSelectCard(card: Card) {
    if (selectedCards.length === 2) return;

    if (selectedCards.length < 2) {
      setSelectedCards(curr => [...curr, card])
    }

    if (selectedCards.length) {
      setTimeout(() => setSelectedCards([]), 1000)
    }

    if (selectedCards.map(item => item.name).includes(card.name)) {
      setMatchedCards(curr => [...curr, ...selectedCards, card])
      setSelectedCards(curr => curr.filter(item => item.name !== card.name))
    }
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
      <h2 className="mt-5 text-zinc-400 text-center mx-auto md:text-lg">Encontre todos os pokemóns!</h2>

      <div className="flex flex-wrap mt-12 max-w-[600px] mx-auto px-3 justify-center gap-8 h-[55vh] overflow-y-auto md:h-fit md:justify-between md:gap-0 md:px-0 md:gap-y-4">
        {cards.map(item => (
          <GameCard
            {...item}
            onSelectCard={onSelectCard}
            isSelected={selectedCards.map(item => item.id).includes(item.id) || matchedCards.map(item => item.id).includes(item.id)}
          />
        ))}
      </div>

      <a
        aria-label="Github"
        href="https://github.com/joaorodrs/pokemon-memory"
        target='_blank'
        className="mx-auto mt-8 text-white p-4 m-2 rounded-xl hover:text-red-500 hover:bg-white/10"
      >
        <GithubIcon />
      </a>
    </main>
  )
}

const variants = {
  hidden: { rotateY: '0deg', transition: { duration: 0.3 } },
  visible: { rotateY: '360deg', transition: { duration: 0.3 } },
}

function GameCard({
  id,
  source,
  name,
  onSelectCard,
  isSelected
}: Card & { onSelectCard(card: Card): void, isSelected: boolean }) {
  return (
    <motion.button
      key={String(id)}
      className="flex items-center justify-center bg-white size-32 rounded-2xl"
      onClick={() => onSelectCard({ id, source, name })}
      disabled={isSelected}
      variants={variants}
      animate={isSelected ? 'visible' : 'hidden'}
    >
      <img src={!isSelected ? PokeballSvg : source} alt={!isSelected ? 'Pokeball' : name} />
    </motion.button>
  )
}

export default App

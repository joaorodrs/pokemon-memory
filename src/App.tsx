import { Progress } from '@/components/ui/progress'
import CyndaquilSvg from '@/assets/cyndaquil.svg'
import EeveeSvg from '@/assets/eevee.svg'
import BulbasaurSvg from '@/assets/bulbasaur.svg'
import PokeballSvg from '@/assets/pokeball.svg'
import PikachuSvg from '@/assets/pikachu.svg'
import SquirtleSvg from '@/assets/squirtle.svg'
import CharmanderSvg from '@/assets/charmander.svg'

import './App.css'

function App() {
  return (
    <main className="w-screen h-screen px-9 py-12">
      <h1 className="font-mono text-2xl text-center mx-auto md:text-4xl">Jogo da Memória</h1>
      <h2 className="mt-5 text-zinc-400 text-center mx-auto md:text-lg">Você tem 15 tentativas para encontrar todos os pokemóns</h2>

      <div className="mt-8 max-w-[1000px] mx-auto">
        <div className="flex justify-between items-end">
          <span className="text-sm font-extrabold md:text-md">Tentativas</span>
          <span className="text-2xl font-extrabold">5/15</span>
        </div>
        <Progress value={34} className="mt-2" />
      </div>

      <div className="flex flex-wrap mt-8 max-w-[1000px] mx-auto">
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={CyndaquilSvg} alt="Cyndaquil" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={EeveeSvg} alt="Eevee" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={BulbasaurSvg} alt="Bulbasaur" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={PokeballSvg} alt="Pokeball" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={PikachuSvg} alt="Pikachu" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={SquirtleSvg} alt="Squirtle" />
        </button>
        <button className="flex items-center justify-center bg-white size-32 rounded-2xl">
          <img src={CharmanderSvg} alt="Charmander" />
        </button>
      </div>
    </main>
  )
}

export default App

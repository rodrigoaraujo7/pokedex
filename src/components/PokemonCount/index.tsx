import { FC } from 'react'

// icons
import { MdCatchingPokemon } from 'react-icons/md'

// components
import * as Atom from './atoms'

// types
export interface IPokemonCount {
  count: number
}

const PokemonCount: FC<IPokemonCount> = ({ count }) => {
  return (
    <Atom.PokemonCountContainer
      align='center'
      justify='flex-start'
      direction='row'
      gap='xxs'
    >
      <MdCatchingPokemon size="25" />
      {count} Pokemons
    </Atom.PokemonCountContainer>
  )
}

export default PokemonCount
import React, { FC } from 'react'

// icons
import { MdCatchingPokemon } from 'react-icons/md'

// styles
import * as Atom from './atom'

// types
export interface ILoading {
  isLoading: boolean,
  loadingText?: string
}

// ::
const Loading: FC<ILoading> = ({ isLoading, loadingText }) => {
  if (!isLoading) return null;

  return (
    <Atom.LoadingContainer
      align='center'
      justify='flex-start'
      direction='row'
      gap='xxs'
    >
      <Atom.PokemonIcon>
        <MdCatchingPokemon size="20" />
      </Atom.PokemonIcon>
      {loadingText}
    </Atom.LoadingContainer>
  )
}

export default Loading
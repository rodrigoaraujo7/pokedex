import { atom } from 'recoil';

export const atomHashPokemonsFetch = atom<number>({
  key: 'atomHashPokemonsFetch',
  default: 0
})

export const atomHashPokemonsList = atom<number>({
  key: 'atomHashPokemonsList',
  default: 0
})
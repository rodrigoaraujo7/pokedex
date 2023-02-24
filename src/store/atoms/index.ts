import { atom } from 'recoil';
import { IPokemon, IPokemonFetch } from '../../interface';

export const atomPokemonSearch = atom<string | undefined>({
  key: 'atomPokemonSearch',
  default: ''
})

export const atomPokemonFetch = atom<IPokemonFetch[]>({
  key: 'atomPokemonFetch',
  default: [] // need be a [] because the types -> IPokemonFetch[]
})

export const atomPokemonOffset = atom<number>({
  key: 'atomPokemonOffset',
  default: 0
})

export const atomPokemonList = atom<IPokemon[]>({
  key: 'atomPokemonList',
  default: []
})
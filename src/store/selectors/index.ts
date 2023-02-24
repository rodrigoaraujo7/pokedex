import { selector } from 'recoil'

// api
import { requester } from '../../api/requester';
import { IPokemon, IPokemonFetch } from '../../interface';

// recoil: atoms
import { atomPokemonOffset, atomPokemonSearch } from '../atoms'

export const selectorFetchPokemons = selector<IPokemonFetch[]>({
  key: 'selectorFetchPokemons',
  get: async ({ get }) => {
    const offSet = get(atomPokemonOffset); // limit

    const { data } = await requester({
      baseURL: "https://pokeapi.co/api/v2",
    }).get(`/pokemon?limit=15&offset=${offSet}`);

    return data;
  }
})

export const selectorGetPokemon = selector<IPokemon>({
  key: 'selectorGetPokemon',
  get: async ({ get }) => {
    const pokemon = get(atomPokemonSearch);

    if(pokemon) {
      const { data } = await requester({
        baseURL: "https://pokeapi.co/api/v2",
      }).get(`/pokemon/${pokemon.toLowerCase().trim()}`);

      return data;
    }
  }
})
import { selector } from 'recoil'

// api
import { requester } from '../../api/requester';
import { IPokemon } from '../../interface';

// recoil: atoms
import { atomPokemonSearch } from '../atoms'

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
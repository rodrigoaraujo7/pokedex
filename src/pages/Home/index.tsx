import { useEffect, useState } from 'react';
import Card from '../../components/Card';

// recoi: hooks
import {
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState
} from 'recoil'

// recoil: atoms
import {
  atomPokemonFetch,
  atomPokemonList,
  atomPokemonOffset,
  atomPokemonSearch
} from '../../store/atoms';

// recoil: selectors
import {
  selectorFetchPokemons,
  selectorGetPokemon,
  selectorGetPokemons
} from '../../store/selectors';
import { Container, FlexBox } from '../../components';

const Home = () => {
  // local: states
  const [searchPokemon, setSearchPokemon] = useState('');

  // recoil: states
  const setPokemon = useSetRecoilState(atomPokemonSearch);
  const setFetchPokemons = useSetRecoilState(atomPokemonFetch);
  const [pokemonsOffset, setPokemonsOffset] = useRecoilState(atomPokemonOffset)
  const [pokemonList, setPokemonList] = useRecoilState(atomPokemonList);

  // recoil: loadable
  const getLoadablePokemons = useRecoilValueLoadable(selectorGetPokemons)
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon);
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemons);

  useEffect(() => {
    if (
      fetchLoadablePokemon.state === 'hasValue'
      && fetchLoadablePokemon.contents !== undefined
    ) {
      setFetchPokemons(fetchLoadablePokemon.contents.results)
    }
  }, [fetchLoadablePokemon.state, fetchLoadablePokemon.contents])

  useEffect(() => {
    if (
      getLoadablePokemons.state === 'hasValue'
      && getLoadablePokemons.contents !== undefined
    ) {
      if (pokemonList.length > 0) {
        setPokemonList(pokemonList.concat(getLoadablePokemons.contents))
      } else {
        setPokemonList(getLoadablePokemons.contents)
      }
    }
  }, [getLoadablePokemons.state, getLoadablePokemons.contents])

  return (
    <Container>
      <FlexBox align='flex-start' justify='center' direction='column' gap='xxs'>
        <input type="text" onChange={(event) => setSearchPokemon(event.target.value)} />
        <button onClick={() => setPokemon(searchPokemon)}>Procurar</button>
        {getLoadablePokemon?.state === "loading" && <div>Loading ...</div>}
        {getLoadablePokemon?.state === "hasValue" &&
          getLoadablePokemon?.contents !== undefined && (
            <Card
              id={getLoadablePokemon.contents.id}
              name={getLoadablePokemon?.contents?.name}
              image={
                getLoadablePokemon?.contents?.sprites?.other?.dream_world?.front_default
                || getLoadablePokemon?.contents.sprites.other?.['official-artwork']?.front_default
                || ''
              }
              preview={
                getLoadablePokemon?.contents?.sprites?.versions?.[
                  "generation-v"
                ]?.["black-white"]?.animated?.front_default
              }
              type={getLoadablePokemon?.contents?.types[0]?.type?.name}
            />
          )
        }
      </FlexBox>
      <FlexBox align='flex-start' justify='center' direction='row' gap='xxs'>
        {pokemonList.map((pokemon) => (
          <Card
            id={pokemon.id}
            name={pokemon.name}
            image={
              pokemon.sprites?.other?.dream_world?.front_default
              || pokemon.sprites.other?.['official-artwork']?.front_default
              || ''
            }
            preview={
              pokemon.sprites?.versions?.[
                "generation-v"
              ]?.["black-white"]?.animated?.front_default
            }
            type={pokemon.types[0]?.type?.name}
          />
        ))}
      </FlexBox>
      <button onClick={() => setPokemonsOffset(pokemonsOffset + 15)}>
        Carregar mais
      </button>
    </Container>
  )
};

export default Home;
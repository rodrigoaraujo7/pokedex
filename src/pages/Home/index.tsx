import { useCallback, useEffect, useMemo, useState } from 'react';
import Card from '../../components/Card';

// recoi: hooks
import {
  useRecoilRefresher_UNSTABLE,
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

// recoil: hashs
import {
  atomHashPokemonsFetch,
  atomHashPokemonsList
} from '../../store/hashs';

const Home = () => {
  // local: states
  const [searchPokemon, setSearchPokemon] = useState('');

  // recoil: states
  const setPokemon = useSetRecoilState(atomPokemonSearch);
  const setFetchPokemons = useSetRecoilState(atomPokemonFetch);
  const [pokemonsOffset, setPokemonsOffset] = useRecoilState(atomPokemonOffset)
  const [pokemonList, setPokemonList] = useRecoilState(atomPokemonList);
  const [hashFetchMorePokemons, setHashFetchMorePokemons] = useRecoilState(
    atomHashPokemonsFetch
  );
  const [hashPokemonsList, setHashPokemonsList] = useRecoilState(
    atomHashPokemonsList
  );

  // recoil: loadable
  const getLoadablePokemons = useRecoilValueLoadable(selectorGetPokemons)
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon);
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemons);

  // memo: states
  const disabledFetchMorePokemons = useMemo(() => {
    if (
      fetchLoadablePokemon.state === 'hasError'
      || fetchLoadablePokemon.state === 'loading'
      || getLoadablePokemons.state === 'hasError'
      || getLoadablePokemons.state === 'loading'
    ) {
      return true
    } else {
      return false
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

  useEffect(() => {
    if (
      fetchLoadablePokemon.state === 'hasValue'
      && fetchLoadablePokemon.contents !== undefined
    ) {
      setFetchPokemons(fetchLoadablePokemon.contents.results)
    }
  }, [fetchLoadablePokemon.state, fetchLoadablePokemon.contents])

  const hasFetchPokemonError = useMemo(() => {
    if (
      fetchLoadablePokemon.state === 'hasError'
      || getLoadablePokemons.state === 'hasError'
    ) {
      return true
    } else {
      return false
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

  const retryFetchMorePokemons = useCallback(() => {
    if (fetchLoadablePokemon.state === 'hasError') {
      setHashFetchMorePokemons(hashFetchMorePokemons + 1)
    }

    if (getLoadablePokemons.state === 'hasError') {
      setHashPokemonsList(hashPokemonsList + 1)
    }
  }, [fetchLoadablePokemon.state, getLoadablePokemons.state])

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
                || getLoadablePokemon?.contents.sprites.other?.['official-artwork']?.front_shiny
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
        {pokemonList.map((pokemon, index) => (
          <Card key={index}
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
      <button
        disabled={disabledFetchMorePokemons}
        onClick={() => setPokemonsOffset(pokemonsOffset + 15)}
      >
        Carregar mais
      </button>
      {hasFetchPokemonError && (
        <button
          onClick={() => retryFetchMorePokemons()}
        >
          Tentar novamente
        </button>
      )}
    </Container>
  )
};

export default Home;
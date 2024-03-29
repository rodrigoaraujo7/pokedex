import { useCallback, useEffect, useMemo, useState } from 'react';

// icons
import { MdAdd, MdAutorenew, MdSearch } from 'react-icons/md'

//  styled-components: components
import { Container, FlexBox } from '../../components';
import Card from '../../components/Card';
import { PokedexView } from '../../components/PokedexView';
import Button from '../../components/Button';
import Input from '../../components/Input';
import PokemonCount from '../../components/PokemonCount';
import Loading from '../../components/Loading';

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

  const pokemonsCounter = useMemo(() => {
    return fetchLoadablePokemon.contents?.count || 0
  }, [fetchLoadablePokemon.contents.count])

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
        const filteredList = getLoadablePokemons.contents.filter(
          (pokemon) => !pokemonList.find(item => item.name === pokemon.name)
        )

        setPokemonList(pokemonList.concat(filteredList))
      } else {
        setPokemonList(getLoadablePokemons.contents)
      }
    }
  }, [getLoadablePokemons.state, getLoadablePokemons.contents])

  return (
    <Container>
      <FlexBox align='flex-start' justify='center' direction='column' gap='xxs'>
        <FlexBox align='center' justify='flex-start' direction='row' gap='xxs'>
          <Input
            type="text"
            placeholder='Procurar por nome ou ID'
            onChange={(event) => setSearchPokemon(event.target.value)}
          />
          <Button onClick={() => setPokemon(searchPokemon)}>
            <MdSearch size="20" />
            Procurar
          </Button>
        </FlexBox>
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
      <PokemonCount count={pokemonsCounter} />
      <PokedexView align='flex-start' justify='center' direction='column' gap='xxs'>
        <FlexBox align='center' justify='center' direction='row' gap='xxs' wrap='wrap'>
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
          <Loading
            loadingText='Carregando pokemons...'
            isLoading={
              getLoadablePokemons.state === 'loading'
              || fetchLoadablePokemon.state === 'loading'
            }
          />
        </FlexBox>
      </PokedexView>
      <FlexBox align='flex-start' justify='center' direction='column'>
        <Button
          disabled={disabledFetchMorePokemons}
          onClick={() => setPokemonsOffset(pokemonsOffset + 10)}
        >
          <MdAdd size="20" />
          Carregar mais
        </Button>
        {hasFetchPokemonError && (
          <Button onClick={() => retryFetchMorePokemons()}>
            <MdAutorenew size="20" />
            Tentar novamente
          </Button>
        )}
      </FlexBox>
    </Container>
  )
};

export default Home;
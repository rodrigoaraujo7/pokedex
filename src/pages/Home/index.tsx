import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil'
import Card from '../../components/Card';

// recoil: atoms
import { atomPokemonSearch } from '../../store/atoms';

// recoil: selectors
import { selectorFetchPokemons, selectorGetPokemon } from '../../store/selectors';

const Home = () => {
  // local: states
  const [searchPokemon, setSearchPokemon] = useState('');

  // recoil: states
  const [pokemon, setPokemon] = useRecoilState(atomPokemonSearch);

  // recoil: loadable
  const getLoadablePokemon = useRecoilValueLoadable(selectorGetPokemon);
  const fetchLoadablePokemon = useRecoilValueLoadable(selectorFetchPokemons);

  useEffect(() => {
    console.log(fetchLoadablePokemon.contents.results)
  }, [fetchLoadablePokemon])

  return (
    <div>
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
    </div>
  )
};

export default Home;
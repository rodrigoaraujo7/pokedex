import { useRecoilState, useRecoilValue } from 'recoil'
import { atomPokemon } from '../../store/atoms';
import { selectorPokemonLength } from '../../store/selectors';

const Home = () => {
  const [pokemon, setPokemon] = useRecoilState(atomPokemon);
  const pokemonLength = useRecoilValue(selectorPokemonLength);

  return (
    <div>
      <input type="text" onChange={(event) => setPokemon(event.target.value)} />
      {pokemon}
      <p>Length: {pokemonLength}</p>
    </div>
  )
};

export default Home;
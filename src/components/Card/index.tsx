import { FC } from "react";
import { TPokemonType } from "../../interface";
import { FlexBox } from "../Flexbox";
import * as Atom from './atoms' // styles

interface ICardProps {
  id: number,
  name: string,
  image: string,
  preview?: string,
  type: TPokemonType,
}

const Card: FC<ICardProps> = ({ id, name, image, preview, type }) => {
  return (
    <Atom.Container gap="xs" align="center" justify="center" direction="column">
      <FlexBox align="center" justify="flex-end" direction="row">
        <Atom.PokemonText type={type}>#{id}</Atom.PokemonText>
      </FlexBox>
      <Atom.PokemonSpot type={type} align="center" justify="center" direction="column">
        <Atom.PokemonSprite src={image} />
      </Atom.PokemonSpot>
      <Atom.PokemonPreviewSection align="center" justify="space-between" direction="row">
        <Atom.PokemonText type={type}>{name}</Atom.PokemonText>
        {preview && <img src={preview} alt="" />}
      </Atom.PokemonPreviewSection>
    </Atom.Container>
  )
}

export default Card;
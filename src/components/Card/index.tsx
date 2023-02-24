import { FC } from "react";
import * as Atom from './atoms' // styles

interface ICardProps {
  name: string,
  image: string
}

const Card: FC<ICardProps> = ({ name, image }) => {
  return (
    <Atom.Container align="center" justify="center" direction="column">
      {name}
      <img src={image} />
    </Atom.Container>
  )
}

export default Card;
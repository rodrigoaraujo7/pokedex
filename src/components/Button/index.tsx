import { ButtonHTMLAttributes, FC } from 'react'

// components
import * as Atom from './atoms'

// types
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e?: any) => void | any,
  textButton: string,
  disabled?: boolean,
}

const Button: FC<IButton> = ({ onClick, textButton, disabled }) => {
  return (
    <Atom.Button disabled={disabled} onClick={onClick}>
      {textButton}
    </Atom.Button>
  )
}

export default Button;
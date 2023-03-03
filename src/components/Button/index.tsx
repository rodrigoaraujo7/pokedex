import { ButtonHTMLAttributes, Children, FC, ReactNode } from 'react'
import { FlexBox } from '../Flexbox'

// components
import * as Atom from './atoms'

// types
export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  disabled?: boolean,
  onClick: (e?: any) => void | any,
}

const Button: FC<IButton> = ({ children, disabled, onClick }) => {
  return (
    <Atom.Button disabled={disabled} onClick={onClick}>
      <FlexBox align='center' justify='center' direction='row' gap='xxxs'>
        {children}
      </FlexBox>
    </Atom.Button>
  )
}

export default Button;
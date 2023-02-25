import { InputHTMLAttributes, FC } from 'react'
import { FlexBox } from '../Flexbox'

// components
import * as Atom from './atoms'

// types
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: FC<IInput> = ({ label, ...rest }) => {
  return (
    <FlexBox align='flex-start' justify='center' direction='column' gap='xxs'>
      {label}
      <Atom.Input {...rest} />
    </FlexBox>
  )
}

export default Input;
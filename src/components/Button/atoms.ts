import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;

  border-radius: ${(props) => props.theme.spacing.xxxs};
  border: none;

  color: ${(props) => props.theme.font.colors.pure};
  font-size: 1em;

  cursor: pointer;

  :disabled {
    cursor: not-allowed;
    opacity: .6;
  }
`
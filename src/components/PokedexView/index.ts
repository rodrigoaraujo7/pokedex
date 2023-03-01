import styled from 'styled-components';
import { FlexBox } from '../Flexbox';

export const PokedexView = styled(FlexBox)`
  background: ${(props) => props.theme.colors.neutral[1]};
  border-radius: ${(props) => props.theme.spacing.xxxs};

  padding: ${(props) => props.theme.spacing.xs};
  margin-top: ${(props) => props.theme.spacing.xs};
  margin-bottom: ${(props) => props.theme.spacing.xs};

  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`
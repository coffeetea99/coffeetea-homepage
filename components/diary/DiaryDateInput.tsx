import { ChangeEvent } from "react";
import styled from 'styled-components';

interface Props {
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

const StyledInput = styled.input`
  display: block;
  height: 30px;
  width: 240px;
  margin: 10px;
  font-size: 25px;
  font-family: Arial, Helvetica, sans-serif;
`

function DiaryTextInput(props: Props) {
  return (
    <StyledInput onChange={props.onChange} />
  )
}

export default DiaryTextInput;


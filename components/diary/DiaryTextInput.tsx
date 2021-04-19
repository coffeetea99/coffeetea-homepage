import { ChangeEvent } from "react";
import styled from 'styled-components';

interface Props {
  onChange: (evt: ChangeEvent<HTMLTextAreaElement>) => void;
}

const StyledTextArea = styled.textarea`
display: block;
  height: 270px;
  width: 480px;
  margin: 10px;
  font-size: 20px;
  font-family: Arial, Helvetica, sans-serif;
`

function DiaryTextInput(props: Props) {
  return (
    <StyledTextArea onChange={props.onChange} />
  )
}

export default DiaryTextInput;

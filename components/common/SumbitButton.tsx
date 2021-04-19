import styled from 'styled-components';

interface Props {
  onClick: () => void;
}

const StyledButton = styled.button`
  display: block;
  height: 30px;
  background-color: #BDBDBD;
  border-radius: 5px;
  width: 70px;
  margin: 15px
`

function SubmitButton(props: Props) {
  return (
    <StyledButton onClick={props.onClick} >Submit</StyledButton>
  )
}

export default SubmitButton;

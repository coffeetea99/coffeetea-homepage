import styled from 'styled-components';

interface Props {
  date: string;
  content: string;
}

const StyledDate = styled.h3`
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
`

const StyledContent = styled.p`
  width: 480px;
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
`

function DiaryRow(props: Props) {
  return (
    <>
      <StyledDate>{props.date}</StyledDate>
      <StyledContent>{props.content}</StyledContent>
    </>
  )
}

export default DiaryRow;

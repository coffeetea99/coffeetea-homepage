import styled from 'styled-components';

interface Props {
  date: string;
  content: string;
  showEditButton: boolean;
  onClickEditButton: () => void;
}

const StyledDate = styled.h3`
  font-size: 15px;
  font-family: Arial, Helvetica, sans-serif;
  display: inline;
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
      {props.showEditButton && <button style={{display: 'inline-block', marginLeft: '10px'}} onClick={props.onClickEditButton}>edit</button>}
      <StyledContent>{props.content}</StyledContent>
    </>
  )
}

export default DiaryRow;

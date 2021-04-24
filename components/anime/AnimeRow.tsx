import styled from 'styled-components';

interface Props {
  title: string;
  date: string;
  screenshots: string[];
}

const StyledDiv = styled.div`
  height: 350px;
  overflow-x: auto;
  white-space: nowrap;
`;

const StyledImg = styled.img`
  height: 300px;
  width: auto;
  margin: 10px;
`;

function AnimeRow(props: Props) {
  return (
    <>
      <h3>{props.date} {props.title}</h3>
      {
        props.screenshots.length === 0 ? null : 
        <StyledDiv>
          {props.screenshots.map(url => <StyledImg src={`http://localhost:3009/${url}`} width="360px" />)}
        </StyledDiv>
      }
    </>
  )
}

export default AnimeRow;

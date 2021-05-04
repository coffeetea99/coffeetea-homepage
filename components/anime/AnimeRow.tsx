import styled from 'styled-components';

interface Props {
  title: string;
  date: string;
  screenshots: string[];
  showEditButton: boolean;
  onClickEditButton: () => void;
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
    <div style={{display: 'block'}}>
      <h3 style={{display: 'inline-block'}} >{props.date} {props.title}</h3>
      {props.showEditButton && <button style={{display: 'inline-block', marginLeft: '10px'}} onClick={props.onClickEditButton}>edit</button>}
      {
        props.screenshots.length === 0 ? null : 
        <StyledDiv>
          {props.screenshots.map(filename => <StyledImg key={filename} src={`http://localhost:3009/image/${filename}`} width="360px" />)}
        </StyledDiv>
      }
    </div>
  )
}

export default AnimeRow;

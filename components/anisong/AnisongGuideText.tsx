import React from 'react';
import styled from 'styled-components'

interface Props {
  title: string;
  content: string;
}

const StyledDivTitle = styled.div`
  display: block;
  overflow: hidden;
  white-space: pre;
  font-size: 36px;
  text-align: center;
`

const StyledDiv = styled.div`
  display: inline-block;
  overflow: hidden;
  white-space: pre;
  font-size: 24px;
`

const AnisongGuideText: React.FC<Props> = (props) => {
  return (
    <>
      <StyledDivTitle>{props.title}</StyledDivTitle>
      {props.content.split('\n').map((lineContent, lineIndex) => (
        <React.Fragment key={lineIndex}>
          <StyledDiv>{lineContent}</StyledDiv>
          <br />
        </React.Fragment>
      ))}
    </>
  )
}

export default AnisongGuideText;

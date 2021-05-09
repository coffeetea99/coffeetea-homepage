import styled from 'styled-components'

interface Props {
  show: boolean;
}

const AnisongGuideButton = styled.button<Props>`
  visibility: ${(props) => props.show ? 'visible' : 'hidden'};
`

export default AnisongGuideButton;

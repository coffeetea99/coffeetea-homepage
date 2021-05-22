import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { getAPI } from '../../common/util';

interface Props {
  header: string;
  isOpen: boolean;
  onClose: () => void;
}

interface IAnisongScoreboard {
  name: string;
  score: number;
}

const modalShow = keyframes`
  from {
    opacity: 0;
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`

const modalBackgroundShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const Modal = styled.div<{show: boolean}>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);

  ${(props) => props.show && css`
    display: flex;
    align-items: center;
    animation: ${modalBackgroundShow} .3s;
  `}
`

const ModalSection = styled.section`
  width: 90%;
  max-width: 450px;
  margin:0 auto;
  border-radius: .3rem;
  background-color: #fff;
  animation: ${modalShow} .3s;
  overflow: hidden;
`

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`

const ModalMain = styled.main`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`

const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;
`

const CloseX = styled.button`
  outline: none;
  cursor: pointer;
  border: 0;

  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
`

const CloseButton = styled.button`
  outline: none;
  cursor: pointer;
  border: none;

  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
`

const AnisongScoreboard: React.FC<Props> = (props) => {
    const { header, isOpen, onClose } = props;

    const [scoreboard, setScoreboard] = useState<IAnisongScoreboard[]>([]);

    useEffect(() => {
      if (isOpen) {
        getAPI<any>(`anisong/scoreboard/list`, null, 'adding score', (response) => {
          setScoreboard(response.scoreboard_list);
        });
      }
    }, [isOpen])

    return (
      <Modal show={isOpen}>
        { isOpen ? (  
          <ModalSection>
            <ModalHeader>
              {header}
              <CloseX onClick={onClose}>&times;</CloseX>
            </ModalHeader>
            <ModalMain>
              <div>
                <div style={{display: 'inline-block', width: '50%'}}>
                  이름
                </div>
                <div style={{display: 'inline-block', width: '50%'}}>
                  점수
                </div>
              </div>
              {scoreboard.map((entry) => (
                <div key={entry.name}>
                  <hr />
                  <div style={{display: 'inline-block', width: '50%'}}>
                    {entry.name}
                  </div>
                  <div style={{display: 'inline-block', width: '50%'}}>
                    {entry.score}
                  </div>
                </div>
              ))}
            </ModalMain>
            <ModalFooter>
              <CloseButton onClick={onClose}>close</CloseButton>
            </ModalFooter>
          </ModalSection>
        ) : null }
      </Modal>
    )
}

export default AnisongScoreboard;

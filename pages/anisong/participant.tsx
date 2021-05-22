import React, { useState, ChangeEvent } from "react"
import { postJsonAPI } from "../../common/util";

function AnisongParticipant() {
  const [showWriteDownNamePopup, setShowWriteDownNamePopup] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  function addName() {
    const data = {
      name: name,
    }
    postJsonAPI('anisong/scoreboard/add', data, 'adding name on scoreboard', (response) => {
      setShowWriteDownNamePopup(false);
    });
  }

  function handleAnswerButtonClick() {
    const data = {
      name: name,
    }
    postJsonAPI(`anisong/poll/add`, data, 'adding poll', (response) => {});
  }

  return (
    showWriteDownNamePopup ? 
    <>
      <h2>사용할 이름을 입력하세요</h2>
      <input style={{height: '100px', fontSize: '80px'}} onChange={(evt) => setName(evt.target.value)} />
      <br />
      <button style={{height: '100px', width: '100px'}} onClick={addName}>확인</button>
    </>
    :
    <>
      <h2>이름: {name}</h2>
      <button style={{height: '500px', width: '500px'}} onClick={handleAnswerButtonClick}>정답</button>
    </>
  )
}

export default AnisongParticipant;

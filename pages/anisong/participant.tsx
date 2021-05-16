import React, { useState, ChangeEvent } from "react"

function AnisongParticipant() {
  const [showWriteDownNamePopup, setShowWriteDownNamePopup] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  function addName() {
    const data = {
      name: name,
    }
    fetch(`${process.env.BACKEND_URL}/anisong/scoreboard/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setShowWriteDownNamePopup(false)
    })
    .catch((err) => {
      console.error('Error on adding name on scoreboard');
      console.error(err);
    });
  }

  function handleAnswerButtonClick() {
    const data = {
      name: name,
    }
    fetch(`${process.env.BACKEND_URL}/anisong/poll/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    })
    .catch((err) => {
      console.error('Error on adding poll');
      console.error(err);
    });
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

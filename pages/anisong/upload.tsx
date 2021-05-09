import { useState, ChangeEvent } from "react";
import Router from 'next/router';

function AnisongUpload() {
  const [audio, setAudio] = useState<File>(null);
  const [description, setDescription] = useState<string>("");

  function handleAudioInput(evt: ChangeEvent<HTMLInputElement>) {
    const audioFiles = evt.target.files;
    if(audioFiles) {
      setAudio(audioFiles[0]);
    }
  }

  function onSubmit() {
    const formData = new FormData();
    formData.append('audio', audio);
    formData.append('description', description);
    fetch("http://localhost:3009/anisong/upload", {
      method: 'POST',
      body: formData,
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      Router.reload();
    });
  }

  return (
    <>
      <input type="file" accept='audio/*' onChange={handleAudioInput} />
      <br />
      <textarea onChange={(evt) => setDescription(evt.target.value)} />
      <br />
      <button onClick={onSubmit}>submit</button>
    </>
  )
}

export default AnisongUpload;

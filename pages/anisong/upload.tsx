import { useState, ChangeEvent } from "react";
import Router from 'next/router';
import { postFormDataAPI } from "../../common/util";

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
    postFormDataAPI(`anisong/upload`, formData, 'uploading anisong', (response) => {
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

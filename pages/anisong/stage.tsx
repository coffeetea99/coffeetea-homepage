import React, { useState, useEffect } from "react"

interface IAnisong {
  id: number;
  filename: string;
  description: string;
}

function AnisongStage() {
  const [trackList, setTrackList] = useState<IAnisong[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [track, setTrack] = useState<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [showRestartPopup, setShowRestartPopup] = useState<boolean>(true);

  useEffect(() => {
    getList();
    return(() => {
      track?.pause();
    })
  }, []);

  useEffect(() => {
    if (trackList.length > 0) {
      if (track) {
        track.pause();
      }
      setTrack(new Audio(`${process.env.BACKEND_URL}/${trackList[trackIndex].filename}`));
      setIsPlaying(false);
    }
  }, [trackIndex]);

  useEffect(() => {
    if (track) {
      if (isPlaying) {
        track.play();
      } else {
        track.pause();
      }
    }
  }, [isPlaying]);

  function restartGame() {
    fetch(`${process.env.BACKEND_URL}/anisong/initialize`, {
      method: 'POST',
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      setShowRestartPopup(false);
    })
    .catch((err) => {
      console.error('Error on restarting anisong game');
      console.error(err);
    });
  }

  function getList() {
    fetch(`${process.env.BACKEND_URL}/anisong/list`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      const data: IAnisong[] = response.data;
      if (data?.length > 0) {
        setTrackList(data);
        setTrackIndex(0);
      }
    })
    .catch((err) => {
      console.error('Error on fetching anisong list');
      console.error(err);
    });
  }

  return (
    showRestartPopup ? 
    <>
      <h1>새 게임을 시작하겠습니까?</h1> 
      <button onClick={restartGame}>예</button>
      <button onClick={() => {setShowRestartPopup(false)}}>아니오</button>
    </>
    :
    <>
      <h3>{trackIndex + 1}번 트랙</h3>
      <img
        src={isPlaying ? "/image/pauseButton.svg" : "/image/playButton.svg"}
        style={{width: "100px", height: "100px"}}
        onClick={() => setIsPlaying(!isPlaying)}
      />
      <br />
      <br />
      
      <button onClick={() => {setTrackIndex(trackIndex === 0 ? trackList.length - 1 : trackIndex - 1)}} >이전 곡</button>
      <button onClick={() => {setTrackIndex(trackIndex === trackList.length - 1 ? 0 : trackIndex + 1)}} >다음 곡</button>
    </>
  )
}

export default AnisongStage;

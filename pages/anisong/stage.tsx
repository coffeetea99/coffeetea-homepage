import React, { useState, useEffect, useRef } from "react"
import AnisongScoreboard from '../../components/anisong/AnisongScoreboard';

interface IAnisong {
  id: number;
  filename: string;
  description: string;
}

interface IAnisongPoll {
  id: number;
  name: string;
}

function AnisongStage() {
  const [trackList, setTrackList] = useState<IAnisong[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(-1);
  const [track, setTrack] = useState<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [showRestartPopup, setShowRestartPopup] = useState<boolean>(true);
  const showRestartPopupRef = useRef<boolean>(true);

  const maxPollIndexRef = useRef<number>(0);
  const [currentPollIndex, setCurrentPollIndex] = useState<number>(0);
  const [pollList, setPollList] = useState<IAnisongPoll[]>([]);

  const [openScoreboard, setOpenScoreboard] = useState<boolean>(false);

  useEffect(() => {
    getList();
    const pollInterval = setInterval(getPollList, 1000);
    return(() => {
      clearInterval(pollInterval);
    })
  }, []);

  useEffect(() => {
    return(() => {
      if (track) {
        track.pause();
        setIsPlaying(false);
      }
    })
  }, [track]);

  useEffect(() => {
    if (trackList.length > 0) {
      setTrack(new Audio(`${process.env.BACKEND_URL}/${trackList[trackIndex].filename}`));
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

  /////

  function restartGame(reset: boolean) {
    if (reset) {
      fetch(`${process.env.BACKEND_URL}/anisong/initialize`, {
        method: 'POST',
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setShowRestartPopup(false);
        showRestartPopupRef.current = false;
      })
      .catch((err) => {
        console.error('Error on restarting anisong game');
        console.error(err);
      });
    } else {
      setShowRestartPopup(false);
      showRestartPopupRef.current = false;
    }
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

  // WARNING: this is a function in setInterval
  function getPollList() {
    if (showRestartPopupRef.current) return;

    fetch(`${process.env.BACKEND_URL}/anisong/poll/pull?max_poll_id=${maxPollIndexRef.current}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      const newPollList: IAnisongPoll[] = response.new_poll_list;
      if (newPollList.length > 0) {
        setPollList(currentList => [...currentList, ...newPollList]);
        maxPollIndexRef.current = Math.max(...newPollList.map(poll => poll.id));
        setIsPlaying(false);
      }
    })
    .catch((err) => {
      console.error('Error on fetching poll list');
      console.error(err);
    });
  }

  function sayAnswer(correct: boolean) {
    if (correct) {
      const data = {
        name: pollList[currentPollIndex].name,
      }
      fetch(`${process.env.BACKEND_URL}/anisong/scoreboard/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        setCurrentPollIndex(pollList.length);
      })
      .catch((err) => {
        console.error('Error on adding score');
        console.error(err);
      });
    } else {
      const increasedPollIndex = currentPollIndex + 1;
      setCurrentPollIndex(increasedPollIndex);
      if (increasedPollIndex === pollList.length) {
        setIsPlaying(true);
      }
    }
  }

  /////

  const handleOpenScoreboard = (open: boolean) => {
    setOpenScoreboard(open);
  }

  return (
    showRestartPopup ? 
    <>
      <h1>새 게임을 시작하겠습니까?</h1> 
      <button onClick={restartGame.bind(this, true)}>예</button>
      <button onClick={restartGame.bind(this, false)}>아니오</button>
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
      {currentPollIndex < pollList.length && 
        <>
          <h2 >누른 사람: {pollList[currentPollIndex].name}</h2>
          <br />
          <button onClick={sayAnswer.bind(this, true)} >맞았습니다</button>
          <button onClick={sayAnswer.bind(this, false)} >틀렸습니다</button>
        </>
      }
      <br />
      <br />
      <br />
      <button onClick={() => {setTrackIndex(trackIndex === 0 ? trackList.length - 1 : trackIndex - 1)}} >이전 곡</button>
      <button onClick={() => {setTrackIndex(trackIndex === trackList.length - 1 ? 0 : trackIndex + 1)}} >다음 곡</button>
      <br />
      <button onClick={handleOpenScoreboard.bind(this, true)}>스코어</button>
      <AnisongScoreboard
        isOpen={openScoreboard}
        onClose={handleOpenScoreboard.bind(this, false)}
        header="Scoreboard"
      />
    </>
  )
}

export default AnisongStage;

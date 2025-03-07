import React, { useState, useEffect, useRef } from "react"
import { getAPI, postJsonAPI } from "../../common/util";
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
  const [trackIndex, setTrackIndex] = useState<number>(null);
  const [track, setTrack] = useState<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [showRestartPopup, setShowRestartPopup] = useState<boolean>(true);
  const showRestartPopupRef = useRef<boolean>(true);

  const maxPollIndexRef = useRef<number>(0);
  const [currentPollIndex, setCurrentPollIndex] = useState<number>(0);
  const [pollList, setPollList] = useState<IAnisongPoll[]>([]);

  const [applicantList, setApplicantList] = useState<string[]>([]);

  const [isFirstPlay, setIsFirstPlay] = useState<boolean>(true);
  const inGame = useRef<boolean>(false);

  const [openScoreboard, setOpenScoreboard] = useState<boolean>(false);

  useEffect(() => {
    getAnisongList();
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
      setIsFirstPlay(true);
    }
  }, [trackIndex]);

  useEffect(() => {
    if (track) {
      if (isPlaying) {
        track.play();
        if (isFirstPlay) {
          inGame.current = true;
          setIsFirstPlay(false);
        }
      } else {
        track.pause();
      }
    }
  }, [isPlaying]);

  /////

  function restartGame(reset: boolean) {
    if (reset) {
      postJsonAPI('anisong/initialize', {}, 'restarting anisong game', (response) => {
        setShowRestartPopup(false);
        showRestartPopupRef.current = false;
      });
    } else {
      setShowRestartPopup(false);
      showRestartPopupRef.current = false;
    }
  }

  function getAnisongList() {
    getAPI<any>('anisong/list', null, 'fetching anisong list', (response) => {
      const data: IAnisong[] = response.data;
      if (data.length > 0) {
        setTrackList(data);
        setTrackIndex(0);
      }
    });
  }

  /////
  // WARNING: this is a function in setInterval
  function getPollList() {
    if (showRestartPopupRef.current) return;

    getAPI<any>('anisong/poll/pull', { max_poll_id: maxPollIndexRef.current }, 'fetching poll list', (response) => {
      const newPollList: IAnisongPoll[] = response.new_poll_list.filter(poll => poll.id > maxPollIndexRef.current);
      if (newPollList.length > 0) {
        maxPollIndexRef.current = Math.max(...newPollList.map(poll => poll.id));
        if (inGame.current) {
          setPollList(currentList => [...currentList, ...newPollList]);
          setIsPlaying(false);
        }
      }
    });
  }

  function sayAnswer(correct: boolean) {
    if (correct) {
      inGame.current = false;
      const data = {
        name: pollList[currentPollIndex].name,
      }
      postJsonAPI(`anisong/scoreboard/score`, data, 'adding score', (response) => {
        setCurrentPollIndex(pollList.length);
      });
    } else {
      const newApplicantList = [...applicantList, pollList[currentPollIndex].name];

      let increasedPollIndex = currentPollIndex + 1;
      while(increasedPollIndex < pollList.length) {
        if (!newApplicantList.includes(pollList[increasedPollIndex].name)) {
          break;
        }
        increasedPollIndex += 1;
      }

      setCurrentPollIndex(increasedPollIndex);
      if (increasedPollIndex === pollList.length) {
        setApplicantList([]);
        setIsPlaying(true);
      } else {
        setApplicantList(newApplicantList)
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

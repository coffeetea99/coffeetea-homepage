import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";

function AnimeEdit() {
  const router = useRouter();
  const { animeId } = router.query;

  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if(animeId) {
      getAnime();
    }
  }, [animeId]);

  function getAnime() {
    fetch(`${process.env.BACKEND_URL}/anime/${animeId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        const data = response.data;
        if (data != null) {
          setDate(data.date);
          setTitle(data.title);
        }
      })
      .catch((err) => {
        console.error('Error on fetching anime');
        console.error(err);
      });
  }

  function updateAnime() {
    const data = {
      date: date,
      title: title,
    }
    fetch(`${process.env.BACKEND_URL}/anime/${animeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      Router.push('/anime');
    });
  }

  return (
    <>
      날짜 ex) [2007.08.31 오전 3시 9분]
      <br />
      <input onChange={(evt) => setDate(evt.target.value)} value={date}/>
      <br />
      제목
      <br />
      <input onChange={(evt) => setTitle(evt.target.value)} value={title}/>
      <br />
      <button onClick={updateAnime}>update</button>
    </>
  )
}

export default AnimeEdit;

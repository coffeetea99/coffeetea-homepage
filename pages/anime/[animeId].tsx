import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { getAPI, postJsonAPI } from "../../common/util";

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
    getAPI<any>(`anime/${animeId}`, null, 'getting single anime', (response) => {
      const data = response.data;
      if (data != null) {
        setDate(data.date);
        setTitle(data.title);
      }
    });
  }

  function updateAnime() {
    const data = {
      date: date,
      title: title,
    }
    postJsonAPI(`anime/${animeId}`, data, 'updating anime', (response) => {
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

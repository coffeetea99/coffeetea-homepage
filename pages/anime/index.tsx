import { useEffect, useState } from "react";
import Link from 'next/link';
import AnimeRow from '../../components/anime/AnimeRow';

interface IAnimeWithScreenshot {
  id: number;
  title: string;
  date: string;
  screenshots: string[];
}

const count = 10;

function Anime() {
  const [startIndex, setStartIndex] = useState<number>(0);
  const [animeList, setAnimeList] = useState<IAnimeWithScreenshot[]>([]);

  useEffect(() => {
    getAnimeList();
  }, []);

  function getAnimeList() {
    fetch(`http://localhost:3009/anime?startIndex=${startIndex}&count=${count}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        const data = response.data;
        if (data?.length > 0) {
          setAnimeList([...animeList, ...data]);
          setStartIndex(startIndex + count);
        }
      })
      .catch((err) => {
        console.error('Error on fetching anime list');
        console.error(err);
      });
  }

  return (
    <>
      <Link href='/anime/record'><a>Upload new</a></Link>
      {animeList.map((anime => <AnimeRow title={anime.title} date={anime.date} screenshots={anime.screenshots}/>))}
      <button style={{display: "block"}} onClick={getAnimeList}>show more</button>
    </>
  )
}

export default Anime;

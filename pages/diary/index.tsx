import { useEffect, useState } from "react";
import Link from 'next/link';
import DiaryRow from "../../components/diary/DiaryRow";

interface Diary {
  date: string;
  content: string
}

function Diary() {
  const [diaryList, setDiaryList] = useState<Diary[]>([]);

  useEffect(() => {
    getDiaryList();
  }, []);

  function getDiaryList() {
    fetch("http://localhost:3009/diary")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        const data = response.data
        setDiaryList(data);
      })
      .catch((err) => {
        console.error('Error on fetching diary list');
        console.error(err);
      });
  }

  return (
    <>
      <Link href='/diary/write'><a>Write new</a></Link>
      {diaryList.map((diary) => <DiaryRow date={diary.date} content={diary.content} key={diary.date} />)}
    </>
  )
}

export default Diary;

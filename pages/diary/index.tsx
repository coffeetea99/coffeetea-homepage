import { useEffect, useState } from "react";
import Router from 'next/router';
import Link from 'next/link';
import DiaryRow from "../../components/diary/DiaryRow";

interface Diary {
  date: string;
  content: string
}

function Diary() {
  const [diaryList, setDiaryList] = useState<Diary[]>([]);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  useEffect(() => {
    getDiaryList();
  }, []);

  function getDiaryList() {
    fetch(`${process.env.BACKEND_URL}/diary`)
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

  function onClickEditButton(date: string) {
    Router.push(`/diary/${date}`);
  }

  return (
    <>
      <Link href='/'><a>Up One Level</a></Link>
      <br />
      <Link href='/diary/write'><a>Write new</a></Link>
      <br />
      <u onClick={() => {setShowEdit(!showEdit)}}>show edit button</u>
      <br />
      <br />
      {diaryList.map((diary) =>
        <DiaryRow
          key={diary.date}
          date={diary.date}
          content={diary.content}
          showEditButton={showEdit}
          onClickEditButton={onClickEditButton.bind(null, diary.date)}
        />)}
    </>
  )
}

export default Diary;

import { useEffect, useState } from "react";
import Router from 'next/router';
import Link from 'next/link';
import DiaryRow from "../../components/diary/DiaryRow";
import { getAPI } from "../../common/util";

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
    getAPI<any>(`diary`, null, 'fetching diary list', (response) => {
      const data = response.data
      setDiaryList(data);
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

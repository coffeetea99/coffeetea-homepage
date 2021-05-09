import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import DiaryDateInput from "../../components/diary/DiaryDateInput";
import DiaryTextInput from "../../components/diary/DiaryTextInput";
import SubmitButton from "../../components/common/SumbitButton";

function DiaryEdit() {
  const router = useRouter();
  const { date } = router.query;

  const [newDate, setNewDate] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(() => {
    if(date) {
      getDiary();
    }
  }, [date]);

  function getDiary() {
    fetch(`${process.env.BACKEND_URL}/diary/${date}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      const data = response.data;
      if (data != null) {
        setNewDate(data.date);
        setContent(data.content);
      }
    })
    .catch((err) => {
      console.error('Error on fetching diary');
      console.error(err);
    });
  }

  function updateDiary() {
    if (!validateDate(newDate)) {
      window.alert('invalid date!');
      return;
    }

    const data = {
      date: date,
      newDate: newDate,
      content: content,
    }
    fetch(`${process.env.BACKEND_URL}/diary/${date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      Router.push('/diary');
    });
  }

  function validateDate(date: string) {
    const format = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    return format.test(date);
  }

  return (
    <>
      <DiaryDateInput onChange={(evt) => setNewDate(evt.target.value)} value={newDate}/>
      <DiaryTextInput onChange={(evt) => setContent(evt.target.value)} value={content}/>
      <SubmitButton onClick={updateDiary} />
    </>
  )
}

export default DiaryEdit;

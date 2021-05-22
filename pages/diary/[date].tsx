import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import DiaryDateInput from "../../components/diary/DiaryDateInput";
import DiaryTextInput from "../../components/diary/DiaryTextInput";
import SubmitButton from "../../components/common/SumbitButton";
import { getAPI, postJsonAPI } from "../../common/util";

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
    getAPI<any>(`diary/${date}`, null, 'fetching single diary', (response) => {
      const data = response.data;
      if (data != null) {
        setNewDate(data.date);
        setContent(data.content);
      }
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
    postJsonAPI(`diary/${date}`, data, 'fixing diary', (response) => {
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

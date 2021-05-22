import { useState, ChangeEvent } from "react";
import Router from 'next/router';
import DiaryDateInput from "../../components/diary/DiaryDateInput";
import DiaryTextInput from "../../components/diary/DiaryTextInput";
import SubmitButton from "../../components/common/SumbitButton";
import { postJsonAPI } from "../../common/util";

function WriteDiary() {
  const [date, setDate] = useState<string>("");
  const [content, setContent] = useState<string>("");

  function validateDate(date: string) {
    const format = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
    return format.test(date);
  }

  function onDateChange(evt: ChangeEvent<HTMLInputElement>) {
    const date = evt.target.value;
    if (validateDate(date)) {
      setDate(date);
    }
  }

  function onTextChange (evt: ChangeEvent<HTMLTextAreaElement>) {
    setContent(evt.target.value);
  }

  function onSubmit() {
    if (date === '' || content === '') {
      window.alert('invalid input!');
      return;
    }

    const data = {
      date: date,
      content: content,
    };
    postJsonAPI('diary', data, 'adding diary', (response) => {
      Router.push('/diary');
    });
  }

  return (
    <>
      <DiaryDateInput onChange={onDateChange} />
      <DiaryTextInput onChange={onTextChange} />
      <SubmitButton onClick={onSubmit} />
    </>
  )
}

export default WriteDiary;

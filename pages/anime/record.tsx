import { useState, ChangeEvent } from "react";
import Router from 'next/router';
import { postFormDataAPI } from "../../common/util";

function AnimeRecord() {
  const [date, setDate] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [imageList, setImageList] = useState<File[]>([]);
  const [imageUrlList, setImageUrlList] = useState<string[]>([]);

  function onDateChange(evt: ChangeEvent<HTMLInputElement>) {
    const _date = evt.target.value;
    setDate(_date);
  }

  function onTitleChange(evt: ChangeEvent<HTMLInputElement>) {
    const _title = evt.target.value;
    setTitle(_title);
  }

  function handleImageInput(evt: ChangeEvent<HTMLInputElement>) {
    const _imageList: File[] = [];
    const _imageUrlList: string[] = [];
    const imageFileList = evt.target.files;

    Array.from(imageFileList).forEach(imageFile => {
      _imageList.push(imageFile);
      _imageUrlList.push(URL.createObjectURL(imageFile));
    });

    setImageList(_imageList);
    setImageUrlList(_imageUrlList);
  }

  function onSubmit() {
    const formData = new FormData();
    for (const image of imageList) {
      formData.append('images', image);
    }
    formData.append('date', date);
    formData.append('title', title);
    postFormDataAPI(`anime`, formData, 'adding anime', (response) => {
      Router.push('/anime');
    });
  }

  return (
    <>
      날짜 ex) [2007.08.31 오전 3시 9분]
      <br />
      <input onChange={onDateChange} />
      <br />
      제목
      <br />
      <input onChange={onTitleChange} />
      <br />
      <input type="file" multiple accept='image/*' onChange={handleImageInput} />
      <br />
      {imageUrlList.map(imageUrl => <img src={imageUrl} width="480px" />)}
      <br />
      <button onClick={onSubmit}>submit</button>
    </>
  )
}

export default AnimeRecord;

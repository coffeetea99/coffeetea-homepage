import { useState, ChangeEvent } from "react";
import Link from 'next/link';
import AnisongGuideText from '../../components/anisong/AnisongGuideText';
import AnisongGuideButton from '../../components/anisong/AnisongGuideButton';

function AnisongGuide() {
  const [page, setPage] = useState<number>(0);

  const title = [`진행 방법`, `정답 규칙`]

  const guide = [
    `
      - 곡이 풀버전 기준으로 맨 처음부터 나옵니다.
      - 한 명이라도 정답 버튼을 누르는 순간 곡이 멈춥니다. 가장 먼저 누른 사람부터 정답을 말합니다.
      - 곡이 멈춘 상태에서도 정답 버튼을 누를 수 있습니다. 앞 사람이 틀렸으면 큐에 있는 다음 사람에게 넘어갑니다.
      - 모두 틀려서 정답 버튼 큐가 다 빠지면 곡이 중단 시점부터 다시 진행됩니다.
      - 한 번 멈췄을 때 한 명이 여러 번 할 말할 수는 없습니다.
    `.replace(/\n\s{6}/g, '\n'),
    `
      - 곡의 제목, 또는 어느 애니에 나오는 어떤 곡(오프닝/엔딩/삽입곡)인지 말해야 합니다.
      - 제목은 일본어 독음으로 해도 되고, 공식/비공식 번역명으로 해도 됩니다.
      - 애니는 분기마다 곡이 다를 경우 분기를 정확히 말해야 합니다.
      - 동명이곡이나, 한 분기에도 오프닝/엔딩이 여러 개인 경우는 허용합니다.
      ex) only my railgun 이 나올 경우
        정답 예시
        - only my railgun
        - 어떤 과학의 초전자포 1기 1쿨 오프닝
        오답 예시
        - 아
        - 그거
        - 뭐였지
        - 어떤 과학의 초전자포 1기 오프닝(어과초 1기는 2쿨이고 둘이 오프닝이 다름)
      ex) 空色デイズ가 나올 경우
        정답 예시
        - 空色デイズ
        - 하늘색 데이즈
        - 천원돌파 그렌라간 오프닝(그렌라간은 2쿨이지만 오프닝이 같음)
      ex) 아이마스 애니는 13곡 전부 <애니마스 1쿨 엔딩> 이라고 해도 됨
    `.replace(/\n\s{6}/g, '\n'),
  ]

  return (
    <>
      <Link href='/anisong'>돌아가기</Link>
      <br />
      <div style={{textAlign: 'center'}}>
        <div style={{display: 'inline-block', textAlign: 'left'}}>
          <AnisongGuideText title={title[page]} content={guide[page]} />
        </div>
        <br/>
        <AnisongGuideButton show={page !== 0} onClick={() => setPage(page - 1)}>이전</AnisongGuideButton>
        <AnisongGuideButton show={page !== guide.length - 1} onClick={() => setPage(page + 1)}>다음</AnisongGuideButton>
      </div>
    </>
  )
}

export default AnisongGuide;

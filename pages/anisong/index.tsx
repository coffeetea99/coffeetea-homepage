import Link from 'next/link';
import AnisongTitle from '../../components/anisong/AnisongTitle';

function Anisong() {
  return (
    <>
      <AnisongTitle>애니송 맞추기</AnisongTitle>
      <Link href='/anisong/guide'><a>하는 방법</a></Link>
      <br />
      <Link href='/anisong/stage'><a>시작</a></Link>
    </>
  )
}

export default Anisong;

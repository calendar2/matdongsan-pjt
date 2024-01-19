import { Link } from 'react-router-dom';

function StartMain() {
  return (
    <div>
      로그인 안 했을 때 캐루셀, 탐색하기, 시작하기 버튼 있는 곳
      <Link to="/">탐색하기</Link>
    </div>
  );
}

export default StartMain;

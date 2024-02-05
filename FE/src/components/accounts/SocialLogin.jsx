import { useNavigate } from 'react-router-dom';

function SocialLogin(props) {
  const getUrlParameter = (name) => {
    // 쿼리 파라미터에서 값을 추출 해 주는 함수
    const { search } = window.location;
    const params = new URLSearchParams(search);
    return params.get(name);
  };
  const navigate = useNavigate();
  const token = getUrlParameter('token');

  console.log(`토큰 파싱: ${token}`);

  if (token) {
    console.log(`로컬스토리지에 토큰 저장${token}`);
    localStorage.setItem('ACCESS_TOKEN', token);
    return navigate('/', { state: props.location });
  }
  return navigate('/login', { state: props.location });
}

export default SocialLogin;

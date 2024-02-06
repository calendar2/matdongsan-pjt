import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function SocialLogin() {
  const getUrlParameter = (name) => {
    const { search } = window.location;
    const params = new URLSearchParams(search);
    return params.get(name);
  };
  const navigate = useNavigate();
  const token = getUrlParameter('token');

  console.log(`토큰 파싱: ${token}`);

  const getKakaoUserdata = async (kakaotoken) => {
    try {
      const response = await axios.get(
        `https://kapi.kakao.com/v2/user/me`,
        {
          headers: {
            Authorization: `Bearer ${kakaotoken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Kakao user data fetch error:', error);
      if (error.response) {
        // 서버 응답이 있는 경우, 응답의 상세 내용을 로깅
        console.log(
          'AxiosError response details:',
          error.response.data
        );
        console.log('token:', kakaotoken);
      }
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 비동기 함수 내에서 await를 사용하여 데이터를 가져옵니다.
      const kakaoUserData = await getKakaoUserdata(token);

      if (token) {
        console.log(`로컬스토리지에 토큰 저장: ${token}`);
        localStorage.setItem('ACCESS_TOKEN', token);

        if (kakaoUserData) {
          console.log('Kakao User Data:', kakaoUserData);
          // 여기에서 사용자 데이터를 활용하여 추가 작업을 수행할 수 있습니다.
        }

        navigate('/');
      }
      // return navigate('/login');
    };

    fetchData();
  }, [token, navigate]);

  return null; // 렌더링할 내용이 없으므로 null을 반환
}

export default SocialLogin;

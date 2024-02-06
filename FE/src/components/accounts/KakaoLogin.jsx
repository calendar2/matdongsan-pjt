import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// sweetalert
// eslint-disable-next-line import/no-extraneous-dependencies
import swal from 'sweetalert2';
import userStore from '../../stores/userStore';

function KakaoLogin() {
  const navigate = useNavigate();
  const { setAccessToken } = userStore();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const REST_API_KEY = process.env.REACT_APP_KAKAO_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
    // sweetalert
    const Toast = swal.mixin({
      toast: true,
      position: 'center-center',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', swal.stopTimer);
        toast.addEventListener('mouseleave', swal.resumeTimer);
      },
    });

    axios
      .post(
        `https://kauth.kakao.com/oauth/token`,
        // 요청 본문 (객체 형태)
        {
          grant_type: 'authorization_code',
          client_id: REST_API_KEY,
          redirect_uri: REDIRECT_URI,
          code,
          client_secret: CLIENT_SECRET,
        },
        // 옵션 객체 (헤더 설정)
        {
          headers: {
            'Content-type':
              'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      )
      .then((res) => {
        console.log(res);
        const ACCESS_TOKEN = res.data.access_token;
        setAccessToken(ACCESS_TOKEN);
        console.log('토큰:', ACCESS_TOKEN);
        axios
          .get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              'Content-type':
                'application/x-www-form-urlencoded;charset=utf-8',
            },
          })
          .then((r) => {
            console.log('사용자 데이터: ', r.data);
            const { nickname } = r.data.properties;
            navigate('signup/');
            Toast.fire({
              icon: 'success',
              title: `반갑습니다. ${nickname}님, \n회원가입 페이지로 이동합니다.`,
            });
          });
      })
      .catch((Error) => {
        console.log('인가코드:', code);
        console.log('api_key:', REST_API_KEY);
        console.log('리다이렉트:', REDIRECT_URI);
        console.log('시크릿:', CLIENT_SECRET);
        console.log('인가코드:', code);
        console.log('토근 못받음:', Error);
      });
  }, []);

  return null;
}
export default KakaoLogin;

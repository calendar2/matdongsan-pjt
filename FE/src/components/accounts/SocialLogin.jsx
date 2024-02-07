import { useNavigate, useLocation } from 'react-router-dom';
// sweetalert
// eslint-disable-next-line import/no-extraneous-dependencies
import swal from 'sweetalert2';
import userStore from '../../stores/userStore';

function SocialLogin() {
  const { setAccessToken } = userStore();
  const navigate = useNavigate();
  const location = useLocation();
  const getUrlParameter = (name) => {
    // 쿼리 파라미터에서 값을 추출 해 주는 함수
    const { search } = location;
    const params = new URLSearchParams(search);
    return params.get(name);
  };
  const token = getUrlParameter('token');
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

  console.log(`토큰 파싱: ${token}`);
  setAccessToken(token);

  if (token) {
    console.log(`로컬스토리지에 토큰 저장${token}`);
    localStorage.setItem('ACCESS_TOKEN', token);
    navigate('/signup', { state: location });
    Toast.fire({
      icon: 'success',
      title: `반갑습니다. \n회원가입 페이지로 이동합니다.`,
    });
  } else {
    console.error();
    console.log('token확인:', token);
    navigate('/', { state: location });
  }
}

export default SocialLogin;

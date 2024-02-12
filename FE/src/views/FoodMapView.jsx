import {
  Routes,
  Route,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Review';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';
import ReviewRegistration from '../components/reviews/ReviewRegistration';
import ReviewDetail from '../components/reviews/ReviewDetail';
import ReviewUpdate from '../components/reviews/ReviewUpdate';
import DongsanModal from '../components/modals/DongsanModal';
import Following from '../components/subscribe/Following';
import Follower from '../components/subscribe/Follower';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';
import UserInfoModal from '../components/modals/UserInfoModal';
import OtherUserDongsanModal from '../components/modals/OtherUserDongsanModal';
import userStore from '../stores/userStore';
import reviewStore from '../stores/reviewStore';
import urlStore from '../stores/urlStore';

function FoodMapView() {
  const { API_URL } = urlStore();
  const navigate = useNavigate();
  const {
    setIsMyPage,
    setCurrentPageID,
    setLoginAccount,
    isMyPage,
    accessToken,
    setAccessToken,
    loginAccount,
    setIsLogin,
  } = userStore();
  const { setRefresh, refresh } = reviewStore();
  const { userID } = useParams();

  useEffect(() => {
    const loginID = loginAccount.id;
    const url = `${API_URL}/account`;
    setAccessToken(localStorage.getItem('ACCESS_TOKEN'));
    axios({
      method: 'get',
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('요청 성공:', response.data);
        setLoginAccount(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('요청 실패:', error);
        // 실패 시 에러 처리
      });
    if (userID !== undefined) {
      setCurrentPageID(userID);
      setIsMyPage(false);
      setTimeout(() => {
        setRefresh(!refresh);
      }, 5); // 리스트목록갱신
    } else {
      setCurrentPageID(loginID); // 로그인한아이디 입력
      setIsMyPage(true);
      setTimeout(() => {
        setRefresh(!refresh); // 리스트목록갱신
      }, 5);
    }
    if (loginID !== undefined) {
      setIsLogin(true);
      console.log(loginID, '로그인 함!');
      setTimeout(() => {
        setRefresh(!refresh);
      }, 5);
    } else {
      setIsLogin(false);
      console.log(loginID, '로그인 안함!');
      setTimeout(() => {
        setRefresh(!refresh);
      }, 5);
    }
  }, [navigate]);
  return (
    <div className={contents.container}>
      <header className={contents.header}>
        <Header />
      </header>
      <main className={contents.wrapper}>
        <SideBar />
        <Routes>
          <Route path="/restaurants/*" element={<Reviews />} />
          <Route path="/subscribe" element={<Subscribe />}>
            <Route index element={<Following />} />
            <Route path="followings" element={<Following />} />
            <Route path="followers" element={<Follower />} />
          </Route>
        </Routes>
        <div>
          <Routes>
            <Route
              path="/restaurants/:restaurantID/detail"
              element={<RestaurantDetail />}
            />
            <Route
              path="/restaurants/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID"
              element={<ReviewDetail />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID/update"
              element={<ReviewUpdate />}
            />
          </Routes>
          <FoodMap />
          {isMyPage && <DongsanModal />}
          {!isMyPage && <UserInfoModal />}
          {!isMyPage && <OtherUserDongsanModal />}
        </div>
      </main>
    </div>
  );
}

export default FoodMapView;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Slider from 'react-slick';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // 화살표 아이콘 div로 감싸지 못하면 없애는게 나을듯
import GlobalFilterModal from '../modals/GlobalFilterModal';
import NotiModal from '../modals/NotiModal';
import ProfileModal from '../modals/ProfileModal';
import LoginModal from '../modals/LoginModal';
import userStore from '../../stores/userStore';
import header from '../../styles/layouts/Header.module.css';
import imgLogo from '../../assets/images/logo.png';
import urlStore from '../../stores/urlStore';

function Header() {
  const { API_URL } = urlStore();
  const url = `${API_URL}/account/rank`;
  const [accountRank, setAccountRank] = useState([]);
  const { accessToken, setLoginModalOpen } = userStore();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  // const location = useLocation();

  const settings = {
    dots: true,
    vertical: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        console.log('유저 순위 요청 성공:', response.data);
        setAccountRank(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('유저 순위 요청 요청 실패:', error);
        // 실패 시 에러 처리
      });
    // console.log(accountRank);
  }, []);
  const modalOpen = () => setLoginModalOpen(true);

  const searchBtnClick = () => {
    navigate({
      // pathname: location.pathname,
      pathname: '/main/restaurants',
      search: `?query=${searchValue}`,
    });
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }
  };

  return (
    <div className={header.container}>
      <div className={header.headline}>
        <Link to="/main/restaurants" className={header}>
          <img
            src={imgLogo}
            alt="mainLogo"
            className={header.imgLogo}
          />
        </Link>
        <div className={header.searchBox}>
          <GlobalFilterModal />
          <div className={header.searchWrapper}>
            <SearchTwoToneIcon
              className={header.searchIcon}
              fontSize="large"
              color="disabled"
              onClick={searchBtnClick}
            />
            <input
              type="text"
              placeholder="사용자명, 음식점명"
              onKeyDown={(e) => activeEnter(e)}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
            />
          </div>
        </div>
        <div className={header.userInfo}>
          {accessToken ? (
            <ul>
              <li>
                <NotiModal />
              </li>
              <li>
                <ProfileModal />
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  type="button"
                  className={header.loginBtn}
                  onClick={modalOpen}
                >
                  <Avatar sx={{ width: 20, height: 20 }} />
                  <span className={header.loginLink}>
                    로그인 및 회원가입
                  </span>
                </button>
                <LoginModal />
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className={header.userRank}>
        <span className={header.userRankLogo}>TOP10</span>
        <div className={header.userRankInfo}>
          <Slider
            dots={false}
            infinite={settings.infinite}
            speed={settings.speed}
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
            arrows={settings.arrows}
            autoplay={settings.autoplay}
            autoplaySpeed={settings.autoplaySpeed}
            vertical={settings.vertical}
          >
            {/* 순위 캐러셀 구현 */}
            {accountRank.map((x, index) => (
              <div key={x.nickname}>
                <span className={header.userRankIndex}>
                  {index + 1}
                </span>
                <span className={header.userRankName}>
                  {x.nickname}
                </span>
                <div className={header.userRankFollower}>
                  <FavoriteIcon
                    sx={{
                      color: 'rgba(29, 177, 119, 0.5)',
                      width: '1vw',
                    }}
                  />
                  <span>{x.follower}</span>
                  <span />
                </div>
              </div>
            ))}
          </Slider>
          {/* <PlayArrowIcon
            sx={{
              color: 'rgba(55,55,55,0.5)',
              transform: 'rotate(90deg)',
              right: '40vw',
              top: '12vh',
              width: '1vw',
            }}
          /> */}
          {/* 화살표 아이콘 div로 감싸지 못하면 없애는게 나을거같음 */}
        </div>
      </div>
    </div>
  );
}

export default Header;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import Slider from 'react-slick';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HomeIcon from '@mui/icons-material/Home';
import GlobalFilterModal from '../modals/GlobalFilterModal';
import NotiModal from '../modals/NotiModal';
import ProfileModal from '../modals/ProfileModal';
import LoginModal from '../modals/LoginModal';
import userStore from '../../stores/userStore';
import header from '../../styles/layouts/Header.module.css';
import imgLogo from '../../assets/images/logo.png';
import urlStore from '../../stores/urlStore';
import UserRankingModal from '../modals/UserRankingModal';
import reviewStore from '../../stores/reviewStore';

function Header() {
  const { API_URL } = urlStore();
  const [userOrLocation, setUserOrLocation] = useState('유저');
  const url = `${API_URL}/account/rank`;
  const [accountRank, setAccountRank] = useState([]);
  const { accessToken, setLoginModalOpen } = userStore();
  const [searchValue, setSearchValue] = useState('');
  const [userSearchInfos, setUserSearchInfos] = useState([]);
  const navigate = useNavigate();
  // const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
  const { refresh, setRefresh, setValue, isOwner } = reviewStore();
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
    if (userOrLocation === '장소') {
      navigate({
        // pathname: location.pathname,
        pathname: '/main/restaurants',
        search: `?query=${searchValue}`,
      });
    }
  };

  const activeEnter = (e) => {
    if (e.key === 'Enter') {
      searchBtnClick();
    }
  };

  const userTab = () => {
    setUserOrLocation('유저');
    setSearchValue('');
    navigate('/main/restaurants');
  };

  const locationTab = () => {
    setUserOrLocation('장소');
    setSearchValue('');
    navigate('/main/restaurants');
  };

  const autoSearch = (e) => {
    setSearchValue(e.target.value);
    axios({
      method: 'get',
      url: `${API_URL}/account/search?query=${e.target.value}`,
    })
      .then((res) => {
        console.log('유저 검색!', res);
        setUserSearchInfos(res.data);
      })
      .catch((err) => {
        console.error('유저 검색ㅠㅠ', err);
      });
  };

  return (
    <div className={header.container}>
      <div className={header.headline}>
        <Link
          to="/main/restaurants"
          className={header}
          onClick={() => {
            setTimeout(() => {
              setRefresh(!refresh);
              setValue(0);
            }, 50);
          }}
        >
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
            {userOrLocation === '유저' ? (
              <input
                type="text"
                placeholder="사용자명"
                onKeyDown={(e) => activeEnter(e)}
                onChange={autoSearch}
                value={searchValue}
              />
            ) : (
              <input
                type="text"
                placeholder="지역, 가게"
                onKeyDown={(e) => activeEnter(e)}
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
              />
            )}
            {userOrLocation === '유저' &&
            searchValue &&
            userSearchInfos.length !== 0 ? (
              <div className={header.userResult}>
                {userSearchInfos.map((info) => (
                  <div
                    key={info.id}
                    className={header.userResultContainer}
                  >
                    <div className={header.userResultWrapper}>
                      <Link
                        to={`/main/users/${info.id}/restaurants/`}
                        onClick={() => {
                          setSearchValue('');
                          setValue(0);
                          setTimeout(() => {
                            setRefresh(!refresh);
                          }, 50);
                        }}
                      >
                        <Avatar />
                      </Link>
                      <div className={header.userResultInfo}>
                        <Link
                          to={`/main/users/${info.id}/restaurants`}
                          onClick={() => {
                            setSearchValue('');
                            setValue(0);
                            setTimeout(() => {
                              setRefresh(!refresh);
                            }, 50);
                          }}
                        >
                          <h4>{info.nickname}</h4>
                        </Link>
                        <FavoriteIcon
                          sx={{ fontSize: 15, color: '#1db177' }}
                        />
                        &nbsp;&nbsp;<span>{info.follower}</span>
                      </div>
                    </div>
                    <AddCircleIcon
                      sx={{ color: '#1db177', fontSize: 32 }}
                      className={header.followBtn}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={header.none} />
            )}
          </div>
          {userOrLocation === '유저' ? (
            <div className={header.btnContainer}>
              <button
                type="button"
                className={header.activeBtn}
                onClick={userTab}
              >
                유저
              </button>
              <button
                type="button"
                className={header.unactiveBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
          ) : (
            <div className={header.btnContainer}>
              <button
                type="button"
                className={header.unactiveBtn}
                onClick={userTab}
              >
                유저
              </button>
              <button
                type="button"
                className={header.activeBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
          )}
        </div>
        <div className={header.userInfo}>
          {accessToken ? (
            <ul>
              {!isOwner && (
                <IconButton
                  sx={{ marginRight: '1vw' }}
                  onClick={() => {
                    navigate('/main/restaurants');
                    setTimeout(() => {
                      setRefresh(!refresh);
                    }, 5);
                  }}
                >
                  <HomeIcon fontSize="large" color="disabled" />
                </IconButton>
              )}
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
        <Button
          aria-describedby={id}
          variant="contained"
          onClick={handleClick}
          className={header.userRankLogo}
        >
          Top10
        </Button>
        {/* 화살표 아이콘 div로 감싸지 못하면 없애는게 나을거같음 */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Typography
            sx={{ p: 2, minHeight: '300px', minWidth: '200px' }}
          >
            <UserRankingModal accountRank={accountRank} />
          </Typography>
        </Popover>
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
        </div>
      </div>
    </div>
  );
}

export default Header;

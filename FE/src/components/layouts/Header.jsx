import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Avatar from '@mui/material/Avatar';
import GlobalFilterModal from '../modals/GlobalFilterModal';
import NotiModal from '../modals/NotiModal';
import ProfileModal from '../modals/ProfileModal';
import LoginModal from '../modals/LoginModal';
import userStore from '../../stores/userStore';
import header from '../../styles/layouts/Header.module.css';
import imgLogo from '../../assets/images/logo.png';

function Header() {
  const { accessToken, setLoginModalOpen } = userStore();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const modalOpen = () => setLoginModalOpen(true);

  const searchBtnClick = () => {
    navigate({
      pathname: location.pathname,
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
      <div className={header.userRank}>유저순위</div>
    </div>
  );
}

export default Header;

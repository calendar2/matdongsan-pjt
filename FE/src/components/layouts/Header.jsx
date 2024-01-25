import { Link } from 'react-router-dom';
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

  const modalOpen = () => setLoginModalOpen(true);

  return (
    <div className={header.container}>
      <div className={header.headline}>
        <Link to="/main" className={header}>
          <img
            src={imgLogo}
            alt="mainLogo"
            className={header.imgLogo}
          />
        </Link>
        <div className={header.searchBox}>
          <GlobalFilterModal />
          <div className={header.searchWrapper}>
            <SearchTwoToneIcon fontSize="large" color="disabled" />
            <input type="text" placeholder="사용자명, 음식점명" />
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
                  <Avatar sx={{ width: 28, height: 28 }} />
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

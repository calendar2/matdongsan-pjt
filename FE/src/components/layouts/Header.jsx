import { Link } from 'react-router-dom';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import Avatar from '@mui/material/Avatar';
import GlobalFilterModal from '../modals/GlobalFilterModal';
import NotiModal from '../modals/NotiModal';
import ProfileModal from '../modals/ProfileModal';
import userStore from '../../stores/userStore';
import header from '../../styles/layouts/Header.module.css';

function Header() {
  const { accessToken } = userStore();

  return (
    <div className={header.container}>
      <div className={header.headline}>
        <Link to="/" className={header}>
          <h1>맛동산</h1>
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
                <div className={header.loginBtn}>
                  <Avatar sx={{ width: 32, height: 32 }} />
                  <Link to="/login" className={header.loginLink}>
                    로그인 및 회원가입
                  </Link>
                </div>
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

import { Link } from 'react-router-dom';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import tab from '../../styles/subscribe/FollowingTab.module.css';

function FollowingTab() {
  const [tabChoice, setTabChoice] = useState(true);

  const tabClick = () => {
    setTabChoice(!tabChoice);
  };

  return (
    <div className={tab.wrapper}>
      <Link to="followings" onClick={tabClick}>
        {tabChoice ? (
          <FavoriteIcon sx={{ fontSize: 15 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 15 }} />
        )}
        &nbsp;&nbsp;팔로잉
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="followers" onClick={tabClick}>
        {!tabChoice ? (
          <FavoriteIcon sx={{ fontSize: 15 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 15 }} />
        )}
        &nbsp;&nbsp;팔로워
      </Link>
    </div>
  );
}

export default FollowingTab;

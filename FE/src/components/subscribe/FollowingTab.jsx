import { Link } from 'react-router-dom';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import tab from '../../styles/subscribe/FollowingTab.module.css';

function FollowingTab() {
  const [followingChoice, setFollowingChoice] = useState(true);
  const [followChoice, setFollowChoice] = useState(false);

  const followingClick = () => {
    setFollowingChoice(true);
    setFollowChoice(false);
  };

  const followClick = () => {
    setFollowingChoice(false);
    setFollowChoice(true);
  };

  return (
    <div className={tab.wrapper}>
      <Link to="followings" onClick={followingClick}>
        {followingChoice && !followChoice ? (
          <FavoriteIcon sx={{ fontSize: 15 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 15 }} />
        )}
        &nbsp;&nbsp;팔로잉
      </Link>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Link to="followers" onClick={followClick}>
        {followChoice && !followingChoice ? (
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

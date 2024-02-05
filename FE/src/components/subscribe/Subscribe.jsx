import { Routes, Route } from 'react-router-dom';
import SubscribeSearch from './SubscribeSearch';
import FollowingTab from './FollowingTab';
import Following from './Following';
import Follower from './Follower';

function Subscribe() {
  return (
    <div>
      <SubscribeSearch />
      <FollowingTab />
      <Routes>
        <Route path="/followings" element={<Following />} />
        <Route path="/followers" element={<Follower />} />
      </Routes>
    </div>
  );
}

export default Subscribe;

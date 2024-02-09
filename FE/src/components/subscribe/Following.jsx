import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useEffect, useState } from 'react';
import user from '../../styles/subscribe/Following.module.css';
import dongsanStore from '../../stores/dongsanStore';
import urlStore from '../../stores/urlStore';

function Following() {
  const [dummyFollowings, setDummyFollowings] = useState([]);
  const { API_URL } = urlStore();
  const url = `${API_URL}/subscription/7`; // 아직 로그인 유저 API 구현이 안돼있어서 7번 유저의 팔로워
  useEffect(() => {
    axios // 여기서 put 요청으로 수정해야함
      .get(url)
      .then((response) => {
        console.log('팔로워 요청 성공:', response.data);
        setDummyFollowings(response.data);
        // 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('팔로워 요청 실패:', error);
        // 실패 시 에러 처리
      });
  }, []);
  const { dongsanUsers, setDongsanUsers } = dongsanStore();

  return (
    <div>
      {dummyFollowings?.map((following) => (
        <div className={user.wrapper} key={following.nickname}>
          <div className={user.content}>
            <div className={user.user}>
              <Avatar sx={{ width: 60, height: 60 }} />
              <div className={user.info}>
                <h4>{following.nickname}</h4>
                <FavoriteIcon sx={{ fontSize: 15 }} />
                &nbsp;&nbsp;<span>{following.follower}</span>
              </div>
            </div>
            <AddCircleIcon
              sx={{
                fontSize: '2.5rem',
                color: 'rgba(29, 177, 119, 0.7)',
              }}
              className={user.addBtn}
              onClick={() => {
                console.log('동산 추가 버튼 클릭됨');
                const copy = [...dongsanUsers];
                if (
                  copy.find((x) => x.nickname === following.nickname)
                ) {
                  console.log('이미 동산에 있는 유저입니다.');
                } else if (copy.length > 9) {
                  console.log(
                    '동산에 10명 이상이 들어갈 수 없습니다.'
                  );
                } else {
                  Object.assign(following, { filter: true });
                  copy.push(following);
                  setDongsanUsers(copy);
                }
                console.log(dongsanUsers);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Following;

import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import user from '../../styles/subscribe/Following.module.css';
import dongsanStore from '../../stores/dongsanStore';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';
import reviewStore from '../../stores/reviewStore';

function Following() {
  const { userID } = useParams();
  const { followingUsers, setFollowingUsers } = userStore();
  const { API_URL } = urlStore();
  const { isMyPage, loginAccount } = userStore();
  const { refresh, setRefresh, value } = reviewStore();
  const { dongsanUsers, setDongsanUsers } = dongsanStore();

  useEffect(() => {
    if (isMyPage) {
      axios //
        .get(`${API_URL}/subscription/${loginAccount.id}`) // 1에서 로그인한 아이디로 수정
        .then((response) => {
          console.log('내 팔로잉목록:', response.data);
          setFollowingUsers(response.data);
          // 성공 시 필요한 작업 수행
        })
        .catch((error) => {
          console.error('내 팔로잉 목록 요청 실패:', error);
          // 실패 시 에러 처리
        });
    } else {
      axios
        .get(`${API_URL}/subscription/${userID}`)
        .then((response) => {
          console.log('팔로잉 목록 요청 성공:', response.data);
          setFollowingUsers(response.data);
          // 성공 시 필요한 작업 수행
        })
        .catch((error) => {
          console.error('팔로워 요청 실패:', error);
          // 실패 시 에러 처리
        });
    }
  }, [refresh]);

  const storageAdd = (id) => {
    const storage = JSON.parse(localStorage.getItem('DONGSAN_LIST'));
    storage.push({
      comparedAccountId: id,
      isHidden: 0,
    });
    localStorage.setItem('DONGSAN_LIST', JSON.stringify(storage));
  };

  return (
    <div>
      <div>
        {followingUsers?.map((following) => (
          <div className={user.wrapper} key={following.id}>
            {/* key={following.id}로 수정 예정임 */}
            <div className={user.content}>
              <div className={user.user}>
                <Link
                  to={
                    value === 0
                      ? `/main/users/${following.id}/restaurants`
                      : `/main/users/${following.id}/subscribe`
                  }
                  onClick={() => {
                    setTimeout(() => {
                      setRefresh(!refresh);
                    }, 5);
                  }}
                >
                  <Avatar sx={{ width: 60, height: 60 }} />
                </Link>
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
                    copy.find(
                      (x) => x.nickname === following.nickname
                    )
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
                    storageAdd(following.id);
                  }
                  console.log('동산 상태', dongsanUsers);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Following;

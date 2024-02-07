import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import user from '../../styles/subscribe/Following.module.css';
import dongsanStore from '../../stores/dongsanStore';

function Following() {
  const { dongsanUsers, setDongsanUsers } = dongsanStore();
  const dummyFollowings = [
    { nickname: '용수', follower: 123 },
    { nickname: '준엽', follower: 423 },
    { nickname: '형준', follower: 765 },
    { nickname: '다은', follower: 543 },
    { nickname: '자영', follower: 432 },
    { nickname: '민재', follower: 876 },
    { nickname: '테스트1', follower: 123 },
    { nickname: '테스트2', follower: 423 },
    { nickname: '테스트3', follower: 765 },
    { nickname: '테스트4', follower: 543 },
    { nickname: '테스트5', follower: 432 },
    { nickname: '테스트6', follower: 876 },
  ]; // axios get, /subscription/{subscriberId}
  return (
    <div>
      {dummyFollowings.map((following) => (
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
              sx={{ fontSize: '2.5rem', color: '#1DB177' }}
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

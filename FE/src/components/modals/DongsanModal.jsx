import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import Avatar from '@mui/material/Avatar';
import dongsan from '../../styles/modals/DongsanModal.module.css';
import dongsanStore from '../../stores/dongsanStore';

function DongsanModal() {
  const { dongsanUsers, setDongsanUsers, toggleDongsanUsersFilter } =
    dongsanStore();
  return (
    <div className={dongsan.box}>
      <div className={dongsan.title}>
        <span>동산</span>
        <button
          type="button"
          onClick={() => {
            setDongsanUsers([
              { nickname: '김더미', followers: '513', filter: true }, // 로그인 기능 구현 되면 로그인 유저의 nickname, followers 가져오기
            ]);
          }}
        >
          모두 비우기
        </button>
      </div>
      <hr className={dongsan.line} />
      <div className={dongsan.content}>
        {dongsanUsers.map((dongsanUser, index) => (
          <div key={dongsanUser.nickname}>
            <div className={dongsan.profile}>
              {dongsanUser.filter ? (
                <VisibilityIcon
                  onClick={() => {
                    toggleDongsanUsersFilter(index);
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => {
                    toggleDongsanUsersFilter(index);
                  }}
                />
              )}

              <Avatar
                sx={{ width: 24, height: 24 }}
                className={dongsan.avatar}
              />
              <span>{dongsanUser.nickname}</span>
              <div className={dongsan.colorCheck} />
              <DoDisturbOnOutlinedIcon
                color="error"
                className={dongsan.cancel}
                onClick={() => {
                  const copy = [...dongsanUsers];

                  if (dongsanUser.nickname === '김더미') {
                    console.log('자기자신은 삭제할 수 없습니다.');
                  } else {
                    setDongsanUsers(
                      copy.filter(
                        (x) => x.nickname !== dongsanUser.nickname
                      )
                    );
                  }
                }}
              />
            </div>
            <hr className={dongsan.line} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DongsanModal;

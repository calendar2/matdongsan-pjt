import Avatar from '@mui/material/Avatar';
import dongsan from '../../styles/modals/OtherUserDongsanModal.module.css';
import dongsanStore from '../../stores/dongsanStore';

function OtherUserDongsanModal() {
  const { dongsanUsers } = dongsanStore();
  return (
    <div className={dongsan.box}>
      <div className={dongsan.title}>
        <span>동산현황</span>
      </div>
      <hr className={dongsan.line} />
      <div className={dongsan.content}>
        {dongsanUsers.map(
          (dongsanUser, index) =>
            index !== 0 && (
              <div key={dongsanUser.nickname}>
                <div className={dongsan.profile}>
                  <Avatar
                    sx={{ width: 24, height: 24 }}
                    className={dongsan.avatar}
                  />
                  <span>{dongsanUser.nickname}</span>
                </div>
                <hr className={dongsan.line} />
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default OtherUserDongsanModal;

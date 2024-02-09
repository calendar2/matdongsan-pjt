import FavoriteIcon from '@mui/icons-material/Favorite';
import styles from '../../styles/modals/UserRankingModal.module.css';

function UserRankingModal(props) {
  const { accountRank } = props;
  return (
    <div className={styles.wrapper}>
      {accountRank.map((x, i) => (
        <div>
          <div className={styles.content}>
            <div>
              <span className={styles.rank}>{i + 1}.</span>
              <span className={styles.name}>{x.nickname}</span>
            </div>
            <span className={styles.follower}>
              <FavoriteIcon
                sx={{
                  color: 'rgba(29, 177, 119, 0.5)',
                  width: '1vw',
                }}
              />
              {x.follower}
            </span>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserRankingModal;

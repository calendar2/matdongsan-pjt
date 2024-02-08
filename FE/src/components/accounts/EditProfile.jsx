import imgLogo from '../../assets/images/logo.png';
import styles from '../../styles/accounts/EditProfile.module.css';

function EditProfile() {
  return (
    <div className={styles.profileBox}>
      <img src={imgLogo} alt="mainLogo" className={styles.imgLogo} />
      <div className={styles.main}>
        <div
          className={styles.gridContainer}
          style={{
            borderBottom: '1px dashed rgba(29, 177, 119, 0.3)',
          }}
        >
          <div className={styles.gridItem}>닉네임</div>
          <div className={styles.gridItem}>asdf</div>
        </div>
        <div
          className={styles.gridContainer}
          style={{
            borderBottom: '1px dashed rgba(29, 177, 119, 0.3)',
          }}
        >
          <div className={styles.gridItem}>프로필 사진</div>
          <div className={styles.gridItem}>asdf</div>
        </div>
        <div
          className={styles.gridContainer}
          style={{
            borderBottom: '1px dashed rgba(29, 177, 119, 0.3)',
          }}
        >
          <div className={styles.gridItem}>매운 맛 선호도</div>
          <div className={styles.gridItem}>asdf</div>
        </div>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>알레르기</div>
          <div className={styles.gridItem}>asdf</div>
        </div>
      </div>
    </div>
  );
}
export default EditProfile;

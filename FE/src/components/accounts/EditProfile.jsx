import imgLogo from '../../assets/images/logo.png';
import styles from '../../styles/accounts/EditProfile.module.css';

function EditProfile() {
  return (
    <div className={styles.profileBox}>
      <img src={imgLogo} alt="mainLogo" className={styles.imgLogo} />
      <div>
        <div>닉네임</div>
        <div>asdf</div>
      </div>
      <div>asdf</div>
    </div>
  );
}
export default EditProfile;

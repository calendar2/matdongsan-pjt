import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import Avatar from '@mui/material/Avatar';
import dongsan from '../../styles/modals/DongsanModal.module.css';

function DongsanModal() {
  return (
    <div className={dongsan.box}>
      <div className={dongsan.title}>
        <span>동산</span>
        <button type="button">모두 비우기</button>
      </div>
      <hr className={dongsan.line} />
      <div className={dongsan.profile}>
        <VisibilityIcon />
        {/* <VisibilityOffIcon /> */}
        <Avatar
          sx={{ width: 24, height: 24 }}
          className={dongsan.avatar}
        />
        <span>닉네임</span>
        <div className={dongsan.colorCheck} />
        <DoDisturbOnOutlinedIcon
          color="error"
          className={dongsan.cancel}
        />
      </div>
      <hr className={dongsan.line} />
      <div className={dongsan.profile}>
        <VisibilityIcon />
        {/* <VisibilityOffIcon /> */}
        <Avatar
          sx={{ width: 24, height: 24 }}
          className={dongsan.avatar}
        />
        <span>닉네임</span>
        <div className={dongsan.colorCheck} />
        <DoDisturbOnOutlinedIcon
          color="error"
          className={dongsan.cancel}
        />
      </div>
    </div>
  );
}

export default DongsanModal;

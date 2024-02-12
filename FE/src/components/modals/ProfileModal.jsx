import { useState } from 'react';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import userStore from '../../stores/userStore';
import reviewStore from '../../stores/reviewStore';

function ProfileModal() {
  const [anchorElProfile, setanchorElProfile] = useState(null);
  const { setAccessToken, setLoginAccount } = userStore();
  const profileOpen = Boolean(anchorElProfile);
  const profileClick = (event) => {
    setanchorElProfile(event.currentTarget);
  };
  const profileClose = () => {
    setanchorElProfile(null);
  };
  const { setRefresh, refresh } = reviewStore();
  return (
    <div>
      <IconButton
        onClick={profileClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={profileOpen ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={profileOpen ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }} />
      </IconButton>
      <Menu
        anchorEl={anchorElProfile}
        id="account-menu"
        open={profileOpen}
        onClose={profileClose}
        onClick={profileClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <Link
          to="/editprofile"
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <MenuItem onClick={profileClose}>
            <Avatar /> 회원정보 수정
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem
          onClick={() => {
            profileClose();
            localStorage.removeItem('ACCESS_TOKEN');
            setAccessToken();
            setLoginAccount({});
            setTimeout(() => {
              setRefresh(!refresh);
            }, 5);
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          로그아웃
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileModal;

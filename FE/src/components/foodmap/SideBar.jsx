import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import MyDongsanIconOn from '../../assets/images/sidebar/foodwhite.png';
import MyDongsanIconOff from '../../assets/images/sidebar/foodblack.png';
import FollowerIconOn from '../../assets/images/sidebar/heartblack.png';
import FollowerIconOff from '../../assets/images/sidebar/heartwhite.png';

function SideBar(props) {
  // eslint-disable-next-line react/prop-types
  const { setCheck } = props;
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setCheck(newValue);
  };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        orientation="vertical"
        aria-label="사이드바 탭"
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none', // 인디케이터 숨김
          },
          boxShadow: '0px 0px 10px 0px rgba(0, 0, 0, 0.2)', // 테두리 그림자
        }}
      >
        <Tab
          label="My동산"
          icon={
            <img
              src={value === 0 ? MyDongsanIconOn : MyDongsanIconOff}
              alt="My동산 아이콘"
              width={50}
            />
          }
          sx={{
            color: value === 0 ? '#ffffff' : '#555558',
            backgroundColor: value !== 0 ? '#ffffff' : undefined,
            '&.Mui-selected': {
              color: '#ffffff',
              backgroundColor: 'rgba(29, 177, 119, 0.7)',
            },
          }}
        />
        <Tab
          label="팔로워"
          icon={
            <img
              src={value === 0 ? FollowerIconOn : FollowerIconOff}
              alt="팔로워 아이콘"
              width={50}
            />
          }
          sx={{
            color: value === 1 ? '#ffffff' : '#555558',
            backgroundColor: value !== 1 ? '#ffffff' : undefined,
            '&.Mui-selected': {
              color: '#ffffff',
              backgroundColor: 'rgba(29, 177, 119, 0.7)',
            },
          }}
        />
      </Tabs>
    </div>
  );
}

export default SideBar;

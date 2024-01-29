import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Tabs, Tab } from '@mui/material';
import MyDongsanIconOn from '../../assets/images/sidebar/foodwhite.png';
import MyDongsanIconOff from '../../assets/images/sidebar/foodblack.png';
import FollowerIconOff from '../../assets/images/sidebar/heartblack.png';
import FollowerIconOn from '../../assets/images/sidebar/heartwhite.png';
import styles from '../../styles/foodmap/SideBar.module.css';

function SideBar() {
  // eslint-disable-next-line react/prop-types
  // const { setCheck } = props;
  const [value, setValue] = useState(0);

  const reviewChange = () => {
    setValue(0);
  };

  const followerChange = () => {
    setValue(1);
  };

  return (
    <div>
      {value === 0 ? (
        <div>
          <div>
            <div className={styles.box}>
              <Link
                to="reviews"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOn}
                  alt="My동산 아이콘"
                  width={50}
                />
                <div
                  style={{
                    color: 'white',
                  }}
                >
                  My동산
                </div>
              </Link>
            </div>
            <div>
              <div className={styles.box2}>
                <Link
                  to="followers"
                  onClick={followerChange}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <img
                      src={FollowerIconOff}
                      alt="My동산 아이콘"
                      width={50}
                    />
                    <div style={{ color: '#555558' }}>팔로워</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div className={styles.box2}>
              <Link
                to="reviews"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOff}
                  alt="My동산 아이콘"
                  width={50}
                />
                <div style={{ color: '#555558' }}>My동산</div>
              </Link>
            </div>
            <div>
              <div className={styles.box}>
                <Link
                  to="followers"
                  onClick={followerChange}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <img
                      src={FollowerIconOn}
                      alt="My동산 아이콘"
                      width={50}
                    />
                    <div
                      style={{
                        color: 'white',
                      }}
                    >
                      팔로워
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Tabs
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
      </Tabs> */}
    </div>
  );
}

export default SideBar;

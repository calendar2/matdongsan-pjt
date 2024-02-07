import { useState } from 'react';
import { Link } from 'react-router-dom';
import MyDongsanIconOn from '../../assets/images/sidebar/foodwhite.png';
import MyDongsanIconOff from '../../assets/images/sidebar/foodblack.png';
import FollowerIconOff from '../../assets/images/sidebar/heartblack.png';
import FollowerIconOn from '../../assets/images/sidebar/heartwhite.png';
import styles from '../../styles/foodmap/SideBar.module.css';

function SideBar() {
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
                to="restaurants"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOn}
                  alt="My동산 아이콘"
                  width={35}
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
                  to="subscribe"
                  onClick={followerChange}
                  style={{
                    textDecoration: 'none',
                  }}
                >
                  <div>
                    <img
                      src={FollowerIconOff}
                      alt="My동산 아이콘"
                      width={35}
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
                to="restaurants"
                onClick={reviewChange}
                style={{
                  textDecoration: 'none',
                }}
              >
                <img
                  src={MyDongsanIconOff}
                  alt="My동산 아이콘"
                  width={35}
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
                      width={35}
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
    </div>
  );
}

export default SideBar;

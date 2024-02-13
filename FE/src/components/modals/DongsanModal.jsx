import { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import dongsan from '../../styles/modals/DongsanModal.module.css';
import dongsanStore from '../../stores/dongsanStore';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';

function DongsanModal() {
  const { dongsanUsers, setDongsanUsers, toggleDongsanUsersFilter } =
    dongsanStore();
  const { KAKAO_URL } = urlStore();
  const { loginAccount } = userStore();
  const [spicyLevel, setSpicyLevel] = useState(0);
  const [bannedFoodList, setBannedFoodList] = useState([]);
  const [spicyWord, setSpicyWord] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [bannedFood, setBannedFood] = useState('');

  const dongsanStatic = () => {
    console.log('동산 상태 분석!', dongsanUsers);
    setIsHidden(true);

    const comparedAccountIds = [];

    for (let i = 0; i < dongsanUsers.length; i += 1) {
      comparedAccountIds.push(dongsanUsers[i].id);
    }

    axios({
      method: 'post',
      url: `${KAKAO_URL}/comparison/statistics/${loginAccount.id}`,
      data: {
        comparedAccountIds,
      },
    })
      .then((res) => {
        console.log('동산 통계!', res);
        setSpicyLevel(res.data.spicyLevel);
        setBannedFoodList(res.data.bannedFoodList);
      })
      .catch((err) => {
        console.error('동산 통계ㅠㅠ', err);
      });
  };

  useEffect(() => {
    if (spicyLevel === 1) {
      setSpicyWord('신라면도 먹을 수 없어요');
    } else if (spicyLevel === 2) {
      setSpicyWord('신라면까지 먹을 수 있어요');
    } else if (spicyLevel === 3) {
      setSpicyWord('불닭볶음면까지 먹을 수 있어요');
    }

    if (bannedFoodList.length === 0) {
      setBannedFood('이 모임에서 못 먹는 음식은 없어요');
    } else {
      setBannedFood(
        `이 모임은 ${bannedFoodList.join()} 을 못 먹어요`
      );
    }
  }, [spicyLevel, bannedFoodList]);

  return (
    <div>
      {isHidden ? (
        <div className={dongsan.staticBox}>
          <CloseIcon
            onClick={() => {
              setIsHidden(false);
            }}
            sx={{
              position: 'absolute',
              right: '5px',
              top: '2px',
              width: '18px',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <p>이 모임은 {spicyWord}</p>
          <p>{bannedFood}</p>
        </div>
      ) : (
        <div className={dongsan.none} />
      )}
      <div className={dongsan.box}>
        <div className={dongsan.title}>
          <span>동산</span>
          <button
            type="button"
            className={dongsan.staticBtn}
            onClick={() => {
              dongsanStatic();
            }}
          >
            분석
          </button>
          <button
            type="button"
            onClick={() => {
              setDongsanUsers([
                {
                  id: loginAccount.id,
                  nickname: loginAccount.nickname,
                  filter: true,
                }, // 로그인 기능 구현 되면 로그인 유저의 nickname, followers, id 가져오기
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
                  color={index !== 0 ? 'error' : 'success'}
                  className={dongsan.cancel}
                  onClick={() => {
                    const copy = [...dongsanUsers];

                    if (index === 0) {
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
    </div>
  );
}

export default DongsanModal;

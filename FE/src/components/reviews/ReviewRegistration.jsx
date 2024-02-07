import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import Avatar from '@mui/material/Avatar';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewRegistration.module.css';
import ReviewRegistrationFriendTagModal from '../modals/ReviewRegistrationFriendTagModal';
import boy0 from '../../assets/images/reviews/boy0.png';
import boy1 from '../../assets/images/reviews/boy1.png';
import boy2 from '../../assets/images/reviews/boy2.png';
import girl0 from '../../assets/images/reviews/girl0.png';
import girl1 from '../../assets/images/reviews/girl1.png';
import girl2 from '../../assets/images/reviews/girl2.png';
import urlStore from '../../stores/urlStore';

// import Slider from '@mui/material/Slider'; 슬라이더로 채택할지 고민해보자
// import employee from '../../assets/images/reviews/accounting.png'; // 항목별 평점에 사용할 이미지로 가져왔는데 어울리는지 판단하기 위해 일단 보류하기로 함
// import tongue from '../../assets/images/reviews/tongue.png'; // 항목별 평점에 사용할 이미지로 가져왔는데 어울리는지 판단하기 위해 일단 보류하기로 함

function ReviewRegistration() {
  const icons = [boy0, boy1, boy2, girl0, girl1, girl2];
  // const [가게이름, 가게이름수정] = useState('');
  const [친절도, 친절도수정] = useState(0);
  const [맛, 맛수정] = useState(0);
  // const [사진, 사진수정] = useState('');
  const [내용, 내용수정] = useState('');
  const [같이간친구, 같이간친구수정] = useState([]);
  const [임의친구이름, 임의친구이름수정] = useState('');
  const [임의친구생년, 임의친구생년수정] = useState(
    dayjs(dayjs().format('YYYY-MM-DD'))
  );
  const [방문날짜, 방문날짜수정] = useState(
    dayjs(dayjs().format('YYYY-MM-DD'))
  );
  const [임의친구들, 임의친구들수정] = useState([]);
  const [전체친구] = useState([
    // 내 전체 친구 확인하는 API가 있는지 확인할 필요
    { title: '다은' },
    { title: '민재' },
    { title: '형준' },
    { title: '준엽' },
    { title: '자영' },
    { title: '용수' },
  ]);
  const { setRegistration, registration } = reviewStore();
  const { API_URL } = urlStore();
  useEffect(
    () => () => {
      console.log('기록페이지 언마운트 됨!'); // Axios 요청을 보내서 리뷰 리스트를 갱신할 예정입니다 (useEffect 안에 적는 코드들은 어려운 연산 / 서버에서 데이터 가져오는 작업),
      // 따라서 Dependency에 []를 넣고 unmount 됐을때 한번만 처리할 예정입니다
      임의친구들수정([]);
    },
    []
  );
  const { restaurantStore } = reviewStore();
  const { restaurantID } = useParams();
  const [클릭버튼, 클릭버튼수정] = useState(false);
  const navigate = useNavigate();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    같이간친구수정(selectedOptions.map((option) => option.title));
    console.log('같이 간 사람을 선택했습니다!', 같이간친구);
  };
  const filteredShop = restaurantStore.find(
    (x) => x.id === Number(restaurantID)
  );
  const restaurants = restaurantStore.map((x) => ({
    label: x.가게이름,
  }));
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div>
            <div className={styles.header}>
              {/* 음식점목록을 반영한 autocomplete로 바꿔야함 */}
              {restaurantID == null ? (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  // options={businessTypesCategory}
                  options={restaurants.map((option) => option.label)}
                  onChange={(e, name) => {
                    setSelectedRestaurant(name);
                    console.log(selectedRestaurant);
                    console.log('업종선택되었습니다');
                  }}
                  sx={{
                    width: 300,
                    height: 50,
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                        },
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink':
                      {
                        color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                      },
                  }}
                  renderInput={(params) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <TextField {...params} label="가게이름" />
                  )}
                />
              ) : (
                <div>{filteredShop?.가게이름}</div>
              )}

              <CloseIcon
                onClick={() => {
                  navigate('/main/restaurants');
                }}
                sx={{
                  position: 'absolute',
                  right: '1vw',
                  top: '2vh',
                  width: '18px',
                  '&:hover': {
                    cursor: 'pointer',
                  },
                }}
              />
            </div>
            <hr />
            <div className={styles.rating}>
              {/* <div>
              <img src={employee} alt="" width={50} />
            </div> */}
              <div>
                <Typography
                  component="legend"
                  sx={{ color: 'rgba(55,55,55,0.7)' }}
                >
                  친절
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={친절도}
                  onChange={(event, newValue) => {
                    친절도수정(Number(newValue));
                    console.log('친절도 선택되었습니다!');
                    console.log(친절도);
                  }}
                  sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
                />
                {/* 슬라이더로 채용할지 고민해보자 */}
                {/* <Slider
                defaultValue={50}
                aria-label="Default"
                valueLabelDisplay="auto"
                onChange={(event, newValue) => {
                  친절도수정(Number(newValue));
                  console.log('친절도 선택되었습니다!');
                  console.log(친절도);
                }}
                style={{ width: '200px' }}
                color="success"
              /> */}
              </div>
            </div>
            <div className={styles.rating}>
              {/* <img src={tongue} alt="" width={50} /> */}
              <div>
                <Typography
                  component="legend"
                  sx={{ color: 'rgba(55,55,55,0.7)' }}
                >
                  맛
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={맛}
                  onChange={(event, newValue) => {
                    맛수정(Number(newValue));
                    console.log('맛 선택되었습니다!');
                    console.log(맛);
                  }}
                  sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
                />
              </div>
            </div>
            <hr />
            <div>
              <IconButton
                onClick={() => {
                  console.log('사진 추가 버튼을 클릭했음!');
                }}
              >
                <AddPhotoAlternateIcon />
              </IconButton>
            </div>
            <TextField
              id="outlined-multiline-static"
              label=""
              multiline
              rows={20}
              fullWidth
              className={styles.textFieldStyle}
              placeholder="당신의 이야기를 남기세요...."
              onChange={(e) => {
                내용수정(e.target.value);
                console.log(내용);
                console.log('내용 수정 했습니다!');
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(29, 177, 119, 0.5)',
                  }, // 텍스트필드 색상 바꾸는 CSS
                },
                '& input::placeholder': {
                  textAlign: 'center',
                  marginRight: '30px',
                },
              }}
            />
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              같이 방문한 친구
            </Typography>
            <div className={styles.friend}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={전체친구}
                getOptionLabel={(option) => option.title}
                size="small"
                filterSelectedOptions
                onChange={handleAutocompleteChange}
                sx={{
                  width: 300,
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                      },
                  },
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    label="검색"
                    placeholder=""
                    sx={{
                      textAlign: 'center',
                      display: 'block',
                    }}
                  />
                )}
              />
              <Button
                type="button"
                variant="contained"
                size="small"
                sx={{ width: '100px' }}
                onClick={() => {
                  클릭버튼수정(!클릭버튼);
                }}
                style={{
                  backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                  color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                  fontSize: '0.5rem', // 버튼의 글자 크기를 조절
                  borderRadius: '5px',
                  marginLeft: '30px',
                  maxHeight: '30px',
                }}
              >
                계정없는친구
              </Button>
            </div>
            <div>
              {같이간친구.map((x, i) => (
                <div className={styles.content}>
                  <Avatar
                    alt="Remy Sharp"
                    src={icons[i]}
                    sx={{
                      backgroundColor: 'rgba(29, 177, 119, 0.3)',
                    }}
                  />
                  <p className={styles.item}>{x}</p>
                  <hr />
                </div>
              ))}
            </div>
            {클릭버튼 ? (
              <ReviewRegistrationFriendTagModal
                임의친구이름={임의친구이름}
                임의친구이름수정={임의친구이름수정}
                임의친구생년={임의친구생년}
                임의친구생년수정={임의친구생년수정}
                임의친구들={임의친구들}
                임의친구들수정={임의친구들수정}
                클릭버튼={클릭버튼}
                클릭버튼수정={클릭버튼수정}
              />
            ) : null}
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              계정 없는 친구 태그
            </Typography>
            <div className={styles.tag}>
              {임의친구들.map((x, i) => (
                <div key={x[i]}>
                  <span className={styles.item}>{x.name}</span>
                  <span>/</span>
                  <span>{x.birthYear}</span>
                  <IconButton
                    onClick={() => {
                      const 수정된임의친구들 = 임의친구들.filter(
                        (y) => y.name !== x.name
                      );
                      임의친구들수정(수정된임의친구들);
                    }}
                  >
                    <ClearIcon />
                  </IconButton>
                </div>
              ))}
            </div>
            <hr />
            <Typography
              component="legend"
              sx={{ color: 'rgba(55,55,55,0.7)' }}
            >
              방문한 날짜
            </Typography>
            <div className={styles.date}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker
                    size="small"
                    label="방문 날짜"
                    value={방문날짜}
                    maxDate={dayjs(dayjs().format('YYYY-MM-DD'))}
                    onChange={(newValue) => {
                      방문날짜수정(newValue);
                      console.log('방문 날짜 변경됨!', 방문날짜.$d);
                    }}
                    sx={{
                      margin: '10px',
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                          {
                            borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
                          },
                      },
                      '& .MuiInputLabel-outlined.MuiInputLabel-shrink':
                        {
                          color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
                        },
                      '& .MuiButtonBase-root-MuiPickersDay-root': {
                        backgroundColor: 'green', // 선택된 날짜의 동그라미 색상
                        color: 'white', // 선택된 날짜의 텍스트 색상
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <hr />
            <Button
              type="button"
              variant="contained"
              size="large"
              sx={{ width: '100px' }}
              onClick={() => {
                const requestData = {
                  kindnessRating: 친절도,
                  tasteRating: 맛,
                  content: 내용,
                  visitDate: `${방문날짜.$y}-${방문날짜.$M + 1 >= 10 ? 방문날짜.$M + 1 : `0${방문날짜.$M + 1}`}-${방문날짜.$D >= 10 ? 방문날짜.$D : `0${방문날짜.$D}`}`,
                  restaurantId: 3, // 아직 음식점 등록 API 구현이 안돼있어서 3번 음식점의 리뷰만 작성
                  accountReviews: [], // 아직 팔로워 API 구현이 안돼있어서 빈 목록으로 전송해야함
                  reviewPersonTags: 임의친구들,
                };
                setRegistration(!registration);
                navigate(`/main/restaurants/${restaurantID}`);
                const url = `${API_URL}/review/1`; // 아직 유저 API 구현이 안돼있어서 1번 유저의 리뷰로만 작성
                axios
                  .post(url, requestData)
                  .then((response) => {
                    console.log('요청 성공:', response.data);
                    // 성공 시 필요한 작업 수행
                  })
                  .catch((error) => {
                    console.error('요청 실패:', error);
                    // 실패 시 에러 처리
                  });
              }}
              style={{
                backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
                color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
                fontSize: '1rem', // 버튼의 글자 크기를 조절
                padding: '5px 30px', // 버튼의 내부 여백을 조절
                borderRadius: '20px',
              }}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewRegistration;

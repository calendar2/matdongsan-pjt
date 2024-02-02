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
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import reviewWriteStore from '../../stores/reviewRegistrationStore';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewRegistration.module.css';

// import Slider from '@mui/material/Slider'; 슬라이더로 채택할지 고민해보자
// import employee from '../../assets/images/reviews/accounting.png'; // 항목별 평점에 사용할 이미지로 가져왔는데 어울리는지 판단하기 위해 일단 보류하기로 함
// import tongue from '../../assets/images/reviews/tongue.png'; // 항목별 평점에 사용할 이미지로 가져왔는데 어울리는지 판단하기 위해 일단 보류하기로 함

function ReviewRegistration() {
  const {
    가게이름,
    친절도,
    맛,
    // 전체업종, 업종 입력을 안받기로함
    // 업종, 업종 입력을 안받기로함
    내용,
    전체친구,
    방문날짜,
    같이간친구,
    임의친구들,
    임의친구들수정,
    가게이름수정,
    친절도수정,
    맛수정,
    // 업종수정, 업종 입력을 안받기로함
    내용수정,
    같이간친구수정,
    방문날짜수정,
  } = reviewWriteStore();
  useEffect(
    () => () => {
      console.log('기록페이지 언마운트 됨!'); // Axios 요청을 보내서 리뷰 리스트를 갱신할 예정입니다 (useEffect 안에 적는 코드들은 어려운 연산 / 서버에서 데이터 가져오는 작업),
      // 따라서 Dependency에 []를 넣고 unmount 됐을때 한번만 처리할 예정입니다
      임의친구들수정([]);
    },
    []
  );
  const { reviewStoreList } = reviewStore();
  const { restaurantID } = useParams();
  const [클릭버튼, 클릭버튼수정] = useState(false);
  const navigate = useNavigate();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    같이간친구수정(selectedOptions.map((option) => option.title));
    console.log('같이 간 사람을 선택했습니다!', 같이간친구);
  };
  const filteredShop = reviewStoreList.find(
    (x) => x.id === String(restaurantID)
  );

  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.box}>
          <div>
            <div className={styles.header}>
              {/* 음식점목록을 반영한 autocomplete로 바꿔야함 */}
              {restaurantID == null ? (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  onChange={(e) => {
                    가게이름수정(e.target.value);
                    console.log('가게이름 입력중입니다');
                  }}
                  defaultValue={가게이름}
                  color="success"
                  sx={{ marginLeft: '20px' }}
                />
              ) : (
                <div>{filteredShop.가게이름}</div>
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
            <div className={styles.ratingSpaceBetween}>
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
            <div className={styles.ratingSpaceBetween}>
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
              color="success"
            />
            <hr />
            <p>같이 방문한 친구</p>
            <div className={styles.flexBoxFriend}>
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
                        borderColor: 'green', // 클릭되었을 때 테두리 색상
                      },
                  },
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    color: 'green', // 텍스트가 상단으로 이동할 때의 색상
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
            {클릭버튼 ? <ReviewWriteFriendAdd /> : null}
            {임의친구들.map((x) => (
              <div>{x.name}</div>
            ))}
            <hr />
            <p>방문한 날짜</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  size="small"
                  label="방문 날짜"
                  value={방문날짜}
                  onChange={(newValue) => {
                    방문날짜수정(newValue);
                    console.log('방문 날짜 변경됨!', 방문날짜.$d);
                  }}
                  sx={{
                    margin: '10px',
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                        {
                          borderColor: 'green', // 클릭되었을 때 테두리 색상
                        },
                    },
                    '& .MuiInputLabel-outlined.MuiInputLabel-shrink':
                      {
                        color: 'green', // 텍스트가 상단으로 이동할 때의 색상
                      },
                    '& .MuiButtonBase-root-MuiPickersDay-root': {
                      backgroundColor: 'green', // 선택된 날짜의 동그라미 색상
                      color: 'white', // 선택된 날짜의 텍스트 색상
                    },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
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
                  visitDate: `${방문날짜.$y}-${방문날짜.$M + 1 > 10 ? 방문날짜.$M + 1 : `0${방문날짜.$M + 1}`}-${방문날짜.$D > 10 ? 방문날짜.$D : `0${방문날짜.$D}`}`,
                  restaurantId: 1, // 아직 음식점 등록 API 구현이 안돼있어서 1번 음식점의 리뷰만 작성
                  accountReviews: [],
                  reviewPersonTags: 임의친구들,
                };
                const url = 'https://i10a209.p.ssafy.io/api/review/1'; // 아직 유저 API 구현이 안돼있어서 1번 유저의 리뷰로만 작성
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

function ReviewWriteFriendAdd() {
  const {
    임의친구이름수정,
    임의친구이름,
    임의친구생년,
    임의친구생년수정,
    임의친구들,
    임의친구들수정,
  } = reviewWriteStore();
  return (
    <div className={styles.div1}>
      <div>
        <div className={styles.addFriend}>
          <TextField
            id="standard-basic"
            label="이름"
            variant="standard"
            size="small"
            sx={{
              margin: '10px',
            }}
            onChange={(e) => {
              임의친구이름수정(e.target.value);
              console.log(임의친구이름);
              console.log('임의 친구 추가중입니다');
            }}
            color="success"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              sx={{
                '&::-webkit-scrollbar': {
                  display: 'none', // 스크롤바를 숨깁니다.
                },
              }}
              components={['DatePicker']}
            >
              <DatePicker
                views={['year']}
                openTo="year"
                size="small"
                label="생년"
                sx={{
                  '& .MuiInputBase-root': {
                    // 입력 텍스트 스타일을 조정하는 부분입니다.
                    width: '6.5vw', // 입력 텍스트 너비를 조절합니다.
                  },
                  '& .MuiStack-root': {
                    overflow: 'hidden', // 입력 텍스트 너비를 조절합니다.
                  },
                  margin: '10px',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                      {
                        borderColor: 'green', // 클릭되었을 때 테두리 색상
                      },
                  },
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    color: 'green', // 텍스트가 상단으로 이동할 때의 색상
                  },
                }}
                value={임의친구생년}
                onChange={(newValue) => {
                  임의친구생년수정(newValue);
                  if (임의친구생년)
                    console.log('시작 날짜 변경됨!', 임의친구생년.$y);
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <IconButton
            onClick={() => {
              console.log('임의친구추가버튼이 클릭되었습니다!');
              console.log(임의친구이름, 임의친구생년.$y);
              const copy = [...임의친구들];
              copy.push({
                name: 임의친구이름,
                birthYear: String(임의친구생년.$y),
              });
              임의친구들수정(copy);
            }}
            sx={{
              margin: '10px',
            }}
          >
            <ControlPointIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default ReviewRegistration;

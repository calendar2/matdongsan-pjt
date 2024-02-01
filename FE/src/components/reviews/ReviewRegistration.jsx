import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react';
import { Button } from '@mui/material';
import Chip from '@mui/material/Chip';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
// import photo from '../../assets/images/reviews/photogallery.png';
import reviewWriteStore from '../../stores/reviewWriteStore';
import styles from '../../styles/reviews/ReviewRegistration.module.css';
// import employee from '../../assets/images/reviews/accounting.png';
// import tongue from '../../assets/images/reviews/tongue.png';

function ReviewRegistration() {
  const {
    가게이름,
    친절도,
    맛,
    전체업종,
    업종,
    내용,
    전체친구,
    방문날짜,
    같이간친구,
    가게이름수정,
    친절도수정,
    맛수정,
    업종수정,
    내용수정,
    같이간친구수정,
    방문날짜수정,
  } = reviewWriteStore();
  const [클릭버튼, 클릭버튼수정] = useState(false);
  const navigate = useNavigate();
  // const { restaurantID } = useParams();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    같이간친구수정(selectedOptions.map((option) => option.title));
    console.log('같이 간 사람을 선택했습니다!', 같이간친구);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.box}>
        <div>
          <div className={styles.header}>
            {/* 음식점목록을 반영한 autocomplete로 바꿔야함 */}
            <TextField
              id="standard-basic"
              variant="standard"
              label="상호명"
              onChange={(e) => {
                가게이름수정(e.target.value);
                console.log('가게이름 입력중입니다');
                console.log(가게이름);
              }}
              defaultValue={가게이름}
              color="success"
              sx={{ marginLeft: '20px' }}
            />
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
              />
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
              />
            </div>
          </div>
          <hr />
          <p>업종</p>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={전체업종}
            classes={styles.green}
            sx={{
              margin: 'auto',
              width: 300,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green', // 클릭되었을 때 테두리 색상
                },
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                color: 'green', // 텍스트가 상단으로 이동할 때의 색상
              },
            }}
            onChange={(e, name) => {
              if (name === null) {
                return;
              }
              업종수정(name.label);
              console.log(업종);
              console.log('업종 선택되었습니다!');
            }}
            renderInput={(params) => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <TextField {...params} label="업종" />
            )}
          />
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
              renderTags={(value, getTagProps) =>
                value.slice(0, 1).map((option, index) => (
                  <Chip
                    label={option.title}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...getTagProps({ index })}
                  />
                ))
              }
              sx={{
                width: 300,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
                border: '1px solid rgba(29, 177, 119, 0.7)',
                backgroundColor: '#ffffff', // 버튼의 배경색을 1db177로 설정
                color: 'rgba(29, 177, 119, 0.7)', // 버튼의 글자색을 흰색으로 설정
                fontSize: '0.5rem', // 버튼의 글자 크기를 조절
                borderRadius: '40px',
                marginLeft: '10px',
              }}
            >
              계정 없는 친구
            </Button>
          </div>
          {클릭버튼 ? <ReviewWriteFriendAdd /> : null}
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
                  '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                    color: 'green', // 텍스트가 상단으로 이동할 때의 색상
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
              console.log('저장버튼이 눌렸습니다.');
              console.log(
                가게이름,
                친절도,
                맛,
                전체업종,
                업종,
                내용,
                전체친구,
                방문날짜
              );
            }}
            style={{
              border: '1px solid rgba(29, 177, 119, 0.7)',
              backgroundColor: '#ffffff', // 버튼의 배경색을 1db177로 설정
              color: 'rgba(29, 177, 119, 0.7)', // 버튼의 글자색을 흰색으로 설정
              fontSize: '1.5rem', // 버튼의 글자 크기를 조절
              borderRadius: '40px',
              marginLeft: '10px',
            }}
          >
            저장
          </Button>
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
  } = reviewWriteStore();
  return (
    <div className={styles.div1}>
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
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
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
          }}
          sx={{
            margin: '10px',
          }}
        >
          <ControlPointIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default ReviewRegistration;

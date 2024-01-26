import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import IconButton from '@mui/material/IconButton';
import photo from '../../assets/images/reviews/photogallery.png';
import reviewWriteStore from '../../stores/reviewWriteStore';
import styles from '../../styles/reviews/ReviewsWrite.module.css';

function ReviewWrite() {
  const {
    가게이름,
    가게이름수정,
    친절도,
    친절도수정,
    맛,
    맛수정,
    전체업종,
    업종수정,
    업종,
    내용,
    내용수정,
    전체친구,
    같이간친구,
    같이간친구수정,
    방문날짜,
    방문날짜수정,
  } = reviewWriteStore();
  const [클릭버튼, 클릭버튼수정] = useState(false);
  return (
    <div className={styles.modal}>
      <TextField
        id="standard-basic"
        label="상호명"
        variant="standard"
        onChange={(e) => {
          가게이름수정(e.target.value);
          console.log('가게이름 입력중입니다');
          console.log(가게이름);
        }}
      />
      <hr />
      <p>항목별평점</p>
      <Typography component="legend">친절도</Typography>
      <Rating
        name="simple-controlled"
        value={친절도}
        onChange={(event, newValue) => {
          친절도수정(Number(newValue));
          console.log('친절도 선택되었습니다!');
          console.log(친절도);
        }}
      />
      <Typography component="legend">맛</Typography>
      <Rating
        name="simple-controlled"
        value={맛}
        onChange={(event, newValue) => {
          맛수정(Number(newValue));
          console.log('맛 선택되었습니다!');
          console.log(맛);
        }}
      />
      <hr />
      <p>업종</p>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={전체업종}
        sx={{ width: 300, margin: 'auto' }}
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
        <img
          className={styles.photo}
          src={photo}
          alt=""
          // onClick={() => {
          //   console.log('사진 첨부 하겠습니다!');
          // }}
        />
      </div>
      <TextField
        id="outlined-multiline-static"
        label=""
        multiline
        rows={10}
        fullWidth
        defaultValue="당신의 이야기를 남기세요...."
        className={styles.textFieldStyle}
        onChange={(e) => {
          내용수정(e.target.value);
          console.log(내용);
          console.log('내용 수정 했습니다!');
        }}
      />
      <hr />
      <p>같이 방문한 친구</p>
      <div className={styles.flexBoxFriend}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={전체친구}
          sx={{ width: '250px' }}
          size="small"
          onChange={(e, name) => {
            if (name === null) {
              return;
            }
            같이간친구수정(name.label);
            console.log(같이간친구);
            console.log('같이간친구 선택했습니다!');
          }}
          renderInput={(params) => (
            // eslint-disable-next-line react/jsx-props-no-spreading
            <TextField {...params} label="선택하기" />
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
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              views={['year']}
              openTo="year"
              size="small"
              label="생년"
              value={임의친구생년}
              onChange={(newValue) => {
                임의친구생년수정(newValue);
                if (임의친구생년)
                  console.log('시작 날짜 변경됨!', 임의친구생년.$d);
              }}
              sx={{
                margin: '10px',
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        <IconButton
          onClick={() => {
            console.log('임의친구추가버튼이 클릭되었습니다!');
            console.log(임의친구이름, 임의친구생년);
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

export default ReviewWrite;

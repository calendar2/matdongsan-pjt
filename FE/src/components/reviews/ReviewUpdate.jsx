import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import { useNavigate, useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import styles from '../../styles/reviews/ReviewUpdate.module.css';
import reviewStore from '../../stores/reviewStore';

function ReviewUpdate() {
  // 가게이름: '',
  // 가게이름수정: (value) => set({ 가게이름: value }),
  // 친절도: 0,
  // 친절도수정: (value) => set({ 친절도: value }),
  // 맛: 0,
  // 맛수정: (value) => set({ 맛: value }),
  // 사진: '',
  // 사진수정: (value) => set({ 사진: value }),
  // 내용: '',
  // 내용수정: (value) => set({ 내용: value }),
  const { reviewListSubItems } = reviewStore();
  const { reviewID } = useParams();
  const navigate = useNavigate();
  const filteredReview = reviewListSubItems.find(
    (x) => x.리뷰id === reviewID
  );
  const [가게이름, 가게이름수정] = useState(filteredReview.가게이름);
  const [친절도, 친절도수정] = useState(filteredReview.친절도);
  const [맛, 맛수정] = useState(filteredReview.맛);
  const [사진] = useState(filteredReview.사진);
  const [내용, 내용수정] = useState(filteredReview.내용);
  const [같이간친구] = useState(filteredReview.같이간친구);
  const [임의친구이름] = useState(filteredReview.임의친구이름);
  const [임의친구생년] = useState(filteredReview.가게이름);
  const [방문날짜] = useState(filteredReview.방문날짜);
  console.log(
    '디버그',
    가게이름,
    친절도,
    맛,
    사진,
    내용,
    같이간친구,
    임의친구이름,
    임의친구생년,
    방문날짜
  );
  return (
    <div className={styles.modal}>
      <div className={styles.box}>
        <div className={styles.header}>
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
        <div>{임의친구이름}</div>
        <div>{임의친구생년}</div>
        <div>{같이간친구}</div>
        <hr />
        <div>{방문날짜}</div>
        <hr />
        <Button
          type="button"
          variant="contained"
          size="large"
          sx={{ width: '100px' }}
          onClick={() => {
            console.log('수정하기 버튼이 눌렸어요!.');
            navigate(-1);
          }}
          style={{
            backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
            color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
            fontSize: '1rem', // 버튼의 글자 크기를 조절
            padding: '5px 30px', // 버튼의 내부 여백을 조절
            borderRadius: '20px',
          }}
        >
          <CheckIcon />
        </Button>
      </div>
    </div>
  );
}

export default ReviewUpdate;

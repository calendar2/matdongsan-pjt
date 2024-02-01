import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import styles from '../../styles/reviews/ReviewDetail.module.css';
import reviewStore from '../../stores/reviewStore';

function ReviewDetail() {
  const { reviewListSubItems } = reviewStore();
  const navigate = useNavigate();
  const { reviewID } = useParams();
  const filteredReview = reviewListSubItems.find(
    (x) => x.리뷰id === reviewID
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
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)', fontSize: '25px' }}
          >
            {filteredReview.가게이름}
          </Typography>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            {filteredReview.업종}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            친절
          </Typography>
          <Rating
            name="read-only"
            value={Number(filteredReview.친절도)}
            readOnly
            sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
          />
        </div>
        <div>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            맛
          </Typography>
          <Rating
            name="read-only"
            value={Number(filteredReview.맛)}
            readOnly
            sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
          />
        </div>
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          내용
        </Typography>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
        >
          <TextField
            multiline
            fullWidth
            readOnly
            value={filteredReview.내용}
            color="success"
            underline="none"
          />
        </Box>
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          같이 간 친구
        </Typography>
        <div>{filteredReview.같이간친구}</div>
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          방문한 날짜
        </Typography>
        <div>{filteredReview.방문한날짜}</div>
        <hr />
        <div className={styles.buttonBetween}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: '130px' }}
            onClick={() => {
              console.log('수정하기 버튼이 눌렸어요!.');
              navigate('update');
            }}
            style={{
              backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
              color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
              fontSize: '1rem', // 버튼의 글자 크기를 조절
              padding: '5px 30px', // 버튼의 내부 여백을 조절
              borderRadius: '20px',
            }}
          >
            수정
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: '130px' }}
            onClick={() => {
              console.log('삭제하기 버튼이 눌렸어요!.');
              // navigate('update'); 삭제 요청 엑시오스 보내기
            }}
            style={{
              backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
              color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
              fontSize: '1rem', // 버튼의 글자 크기를 조절
              padding: '5px 30px', // 버튼의 내부 여백을 조절
              borderRadius: '20px',
              marginLeft: '10px',
            }}
          >
            <DeleteIcon />
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;

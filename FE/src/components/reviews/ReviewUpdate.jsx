import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../../styles/reviews/ReviewUpdate.module.css';
import reviewStore from '../../stores/reviewStore';

function ReviewUpdate() {
  const { reviewListSubItems } = reviewStore();
  const { reviewID } = useParams();
  const navigate = useNavigate();
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
          <div>{filteredReview.가게이름}</div>
          <div>N번째 방문입니다!</div>
        </div>
        <hr />
        <div>{filteredReview.친절도}</div>
        <div>{filteredReview.맛}</div>
        <hr />
        <div>{filteredReview.업종}</div>
        <hr />
        <div>{filteredReview.사진}</div>
        <div>{filteredReview.내용}</div>
        <hr />
        <div>{filteredReview.같이간친구}</div>
        <hr />
        <div>{filteredReview.방문한날짜}</div>
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

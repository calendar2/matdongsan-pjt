import { IconButton } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';

import styles from '../../styles/reviews/Review.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewSearch';

function Reviews() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <div>
        <ReviewsSearch className={styles.reviewsearch} />
        <ReviewsList className={styles.reviewlist} />
        <IconButton
          type="button"
          variant="contained"
          onClick={() => {
            navigate('write');
          }}
          style={{
            backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
            color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
            fontSize: '1.5rem', // 버튼의 글자 크기를 조절
            padding: '15px 30px', // 버튼의 내부 여백을 조절
            borderRadius: '40px',
          }}
          className={styles.button}
        >
          <EditIcon />
          기록하기
        </IconButton>
      </div>
    </div>
  );
}

export default Reviews;

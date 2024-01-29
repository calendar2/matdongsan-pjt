import { Button } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import styles from '../../styles/reviews/Review.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewSearch';
import ReviewRegistration from './ReviewRegistration';

function Reviews() {
  const [writeClick, setWriteClick] = useState(false);

  return (
    <div className={styles.layout}>
      <div>
        <ReviewsSearch className={styles.reviewsearch} />
        <ReviewsList className={styles.reviewlist} />
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            setWriteClick(!writeClick);
          }}
          startIcon={<EditIcon />}
          style={{
            backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
            color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
            fontSize: '1.5rem', // 버튼의 글자 크기를 조절
            padding: '15px 30px', // 버튼의 내부 여백을 조절
            borderRadius: '40px',
          }}
          className={styles.button}
        >
          기록하기
        </Button>
      </div>
      {writeClick === true ? <ReviewRegistration /> : null}
    </div>
  );
}

export default Reviews;

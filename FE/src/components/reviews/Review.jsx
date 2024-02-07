import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import { useNavigate } from 'react-router-dom'; 가게 선택 안하고 기록하기 버튼 막아놓음
import styles from '../../styles/reviews/Review.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewSearch';
// import Region from './Region'; // 지역 API 호출
// import Random from './Random'; // 랜덤 사진 API 호출

function Reviews() {
  // const navigate = useNavigate(); 가게 선택 안하고 기록하기 버튼 막아놓음
  return (
    <div className={styles.wrapper}>
      {/* <Region /> 테스트용 컴포넌트 출력입니다 */}
      {/* <Random /> 테스트용 컴포넌트 출력입니다 */}
      <div>
        <ReviewsSearch className={styles.reviewsearch} />
        <ReviewsList className={styles.reviewlist} />
        <IconButton
          type="button"
          variant="contained"
          onClick={() => {
            // navigate('write'); //가게 선택 안하고 기록하기 버튼 막아놓음
          }}
          style={{
            backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
            color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
            fontSize: '1.5rem', // 버튼의 글자 크기를 조절
            padding: '15px 30px', // 버튼의 내부 여백을 조절
            borderRadius: '40px',
          }}
          className={styles.footer}
        >
          <EditIcon />
          기록하기
        </IconButton>
      </div>
    </div>
  );
}

export default Reviews;

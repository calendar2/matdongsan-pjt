import styles from '../../styles/reviews/Review.module.css';
import ReviewsList from './ReviewList';
import ReviewsSearch from './ReviewSearch';

// import Region from './Region'; // 지역 API 호출
// import Random from './Random'; // 랜덤 사진 API 호출

function Reviews() {
  return (
    <div className={styles.wrapper}>
      {/* <Region /> 테스트용 컴포넌트 출력입니다 */}
      {/* <Random /> 테스트용 컴포넌트 출력입니다 */}
      <div>
        <ReviewsSearch className={styles.reviewsearch} />
        <ReviewsList className={styles.reviewlist} />
      </div>
    </div>
  );
}

export default Reviews;

import styles from '../../styles/start/StartView.module.css';

function StartFooter() {
  return (
    <div>
      <div className={styles.topText}>Top 10</div>
      <div className={styles.topBox}>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        {/* 밑 부분은 나중에 반복 코드로 따로 구현 */}
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        <div className={styles.topArticle}>
          <div className={styles.topRank}>1</div>
          <div className={styles.topContent}>
            <div>이미지</div>
            <div>username</div>
            <div>♥ 팔로워 수</div>
          </div>
        </div>
        {/* 여기까지 */}
      </div>
    </div>
  );
}

export default StartFooter;

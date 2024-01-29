import { List, ListItem, ListItemText } from '@mui/material';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';

function ReviewsList() {
  const { reviewStoreList, setreviewStoreListButton } = reviewStore();

  const handleClick = (index) => () => {
    console.log(index, '번째 리뷰 하위 항목 확인 버튼 클릭 함.');
    setreviewStoreListButton(index);
  };

  return (
    <div>
      <List className={styles.reviewsList}>
        {reviewStoreList.map((item, i) => (
          <ListItem
            key={reviewStoreList[i].가게이름}
            onClick={handleClick(i)} // 함수를 반환하는 새로운 함수를 전달
            className={styles.decorateList}
            button
          >
            <ListItemText
              primary={null}
              secondary={
                <span>
                  <span>
                    <span>{reviewStoreList[i].가게이름}</span>
                    <span>친절도 : {reviewStoreList[i].친절도}</span>
                    <span>맛 : {reviewStoreList[i].맛}</span>
                  </span>
                  <span>
                    <span>업종 : {reviewStoreList[i].업종}</span>
                    <span>위치 : {reviewStoreList[i].위치}</span>
                  </span>
                </span>
              }
              className={styles.decorateListItem}
            />
            {reviewStoreList[i].버튼 ? (
              <ReviewsListSubItems id={reviewStoreList[i].id} />
            ) : null}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default ReviewsList;

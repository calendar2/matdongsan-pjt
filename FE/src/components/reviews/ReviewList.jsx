import { List, ListItem, ListItemText } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useState } from 'react';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';

function ReviewsList() {
  const { reviewStoreList, setreviewStoreListButton } = reviewStore();
  const [reviewListSortButton1, setReviewListSortButton1] =
    useState(true);
  const [reviewListSortButton2, setReviewListSortButton2] =
    useState(false);
  const [reviewListSortButton3, setReviewListSortButton3] =
    useState(false);

  const handleClick = (index) => () => {
    console.log(index, '번째 리뷰 하위 항목 확인 버튼 클릭 함.');
    setreviewStoreListButton(index);
  };

  return (
    <div>
      <div className={styles.reveiewListSortButton}>
        <Button
          variant="text"
          onClick={() => {
            setReviewListSortButton1(true);
            setReviewListSortButton2(false);
            setReviewListSortButton3(false);
          }}
          sx={{
            color: reviewListSortButton1 ? '#555558' : '#BFBFBF',
          }}
        >
          • 최신순
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setReviewListSortButton1(false);
            setReviewListSortButton2(true);
            setReviewListSortButton3(false);
          }}
          sx={{
            color: reviewListSortButton2 ? '#555558' : '#BFBFBF',
          }}
        >
          • 별점순
        </Button>
        <Button
          variant="text"
          onClick={() => {
            setReviewListSortButton1(false);
            setReviewListSortButton2(false);
            setReviewListSortButton3(true);
          }}
          sx={{
            color: reviewListSortButton3 ? '#555558' : '#BFBFBF',
          }}
        >
          • 오래된순
        </Button>
      </div>
      <List className={styles.reviewsList}>
        {reviewStoreList.map((item, i) => (
          <ListItem
            key={reviewStoreList[i].가게이름}
            onClick={handleClick(i)}
            className={styles.decorateList}
            button
          >
            <ListItemText
              primary={null}
              secondary={
                <span>
                  <span className={styles.listItemTitle}>
                    <span className={styles.listItemTitleName}>
                      {reviewStoreList[i].가게이름}
                    </span>
                    <span>
                      <span>
                        친절
                        <StarIcon
                          sx={{
                            fontSize: '10px',
                            color: 'rgba(255, 211, 56, 0.7)',
                          }}
                        />
                        {reviewStoreList[i].친절도}
                      </span>
                      <span>|</span>
                      <span>
                        맛
                        <StarIcon
                          sx={{
                            fontSize: '10px',
                            color: 'rgba(255, 211, 56, 0.7)',
                          }}
                        />
                        {reviewStoreList[i].맛}
                      </span>
                    </span>
                  </span>
                  <span className={styles.listItemTitle}>
                    <span>
                      <span>{reviewStoreList[i].위치}</span>
                      <span>|</span>
                      <span>{reviewStoreList[i].업종}</span>
                    </span>
                    <span>3번 방문</span>
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

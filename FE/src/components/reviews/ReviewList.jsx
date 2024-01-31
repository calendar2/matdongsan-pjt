import {
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
// import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
// import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
// 라우터 기능 개발로 임시로 막아둠
// import reviewWriteStore from '../../stores/reviewWriteStore';

function ReviewsList() {
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 라우터 기능 개발로 임시로 막아둠
  // const { reviewStoreList, setreviewStoreListButton } = reviewStore();
  const { reviewStoreList } = reviewStore();
  const [reviewListSortButton1, setReviewListSortButton1] =
    useState(true);
  const [reviewListSortButton2, setReviewListSortButton2] =
    useState(false);
  const [reviewListSortButton3, setReviewListSortButton3] =
    useState(false);
  // 라우터 기능 개발로 임시로 막아둠
  // const { 가게이름수정 } = reviewWriteStore();

  // 라우터 기능 개발로 임시로 막아둠
  // const handleClick = (index) => () => {
  //   console.log(index, '번째 리뷰 하위 항목 확인 버튼 클릭 함.');
  //   setreviewStoreListButton(index);
  //   if (!reviewStoreList[index].버튼) {
  //     가게이름수정(reviewStoreList[index].가게이름);
  //   } else {
  //     가게이름수정('');
  //   }
  // };
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.justfyContentBetween}>
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
        {/* handleScrollToSection, 인자 = 이동하고자하는 음식점 pk) 해당 음식점으로 스크롤 이동) */}
        <div>
          <IconButton onClick={() => handleScrollToSection(0)}>
            <ArrowUpwardIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={() =>
              handleScrollToSection(reviewStoreList.length - 1)
            }
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <List className={styles.reviewsList}>
        {reviewStoreList.map((item, i) => (
          <ListItem
            key={reviewStoreList[i].가게이름}
            onClick={() => {
              // 라우터 기능 개발로 임시로 막아둠
              // handleClick(i);
              navigate(`${item.id}`);
            }}
            className={styles.decorateList}
            button
            id={reviewStoreList[i].id}
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
            <Routes>
              <Route
                path={`${item.id}/*`}
                element={<ReviewsListSubItems id={item.id} />}
              />
            </Routes>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default ReviewsList;

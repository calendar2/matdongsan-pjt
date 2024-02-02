import {
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';

function ReviewsList() {
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    console.log('리뷰 목록 마운트 됨!'); // Axios 요청을 보내서 음식점 목록을 갱신할 예정입니다 (useEffect 안에 적는 코드들은 어려운 연산 / 서버에서 데이터 가져오는 작업),
    // 따라서 Dependency에 []를 넣고 mount 됐을때 한번만 처리할 예정입니다
  }, []);
  const {
    reviewStoreList,
    sortByVisitCount,
    sortByRecentVisitDate,
    sortByAverageTasteAndKindness,
  } = reviewStore();
  const [reviewListSortButton1, setReviewListSortButton1] =
    useState(true);
  const [reviewListSortButton2, setReviewListSortButton2] =
    useState(false);
  const [reviewListSortButton3, setReviewListSortButton3] =
    useState(false);
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
              sortByRecentVisitDate();
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
              sortByVisitCount();
            }}
            sx={{
              color: reviewListSortButton2 ? '#555558' : '#BFBFBF',
            }}
          >
            • 방문순
          </Button>
          <Button
            variant="text"
            onClick={() => {
              setReviewListSortButton1(false);
              setReviewListSortButton2(false);
              setReviewListSortButton3(true);
              sortByAverageTasteAndKindness();
            }}
            sx={{
              color: reviewListSortButton3 ? '#555558' : '#BFBFBF',
            }}
          >
            • 별점순
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
              navigate(`${item.id}`);
            }}
            className={styles.decorateList}
            button
            id={i} // 아티클 문서 목록의 ID를 배열의 인덱스로 설정해서 정렬시에도 ID가 순서대로 나열될 수 있도록 함
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

                            color: 'rgba(29, 177, 119, 0.7)',
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
                            color: 'rgba(29, 177, 119, 0.7)',
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
                    <span>
                      <span>
                        {reviewStoreList[i].방문횟수}번 방문
                      </span>
                      <span>|</span>
                      <span>{reviewStoreList[i].최근방문날짜}</span>
                    </span>
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

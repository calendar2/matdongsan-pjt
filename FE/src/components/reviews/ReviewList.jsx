import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Divider,
  Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
import stewImg from '../../assets/images/reviews/stewImg.jpg';

function ReviewsList() {
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    // axios
    //   .get('https://i10a209.p.ssafy.io/api/restaurant/1')
    //   .then((data) => {
    //     console.log(data);
    //   });
    console.log('리뷰 목록 마운트 됨!'); // Axios 요청을 보내서 음식점 목록을 갱신할 예정입니다 (useEffect 안에 적는 코드들은 어려운 연산 / 서버에서 데이터 가져오는 작업),
    // 따라서 Dependency에 []를 넣고 mount 됐을때 한번만 처리할 예정입니다
  }, []);
  const {
    restaurantStore,
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
      <div className={styles.header}>
        <div className={styles.sortBtn}>
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
              handleScrollToSection(restaurantStore.length - 1)
            }
          >
            <ArrowDownwardIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      <List className={styles.container}>
        {restaurantStore.map((item, i) => (
          <ListItem
            key={restaurantStore[i].id}
            onClick={() => {
              navigate(`${item.id}`);
            }}
            className={styles.content}
            button
            id={i}
          >
            <ListItemText
              className={styles.contentList}
              primary={null}
              secondary={
                <Typography component="div">
                  <ListItemAvatar>
                    <Avatar alt="사진" src={stewImg} />
                  </ListItemAvatar>
                  <span className={styles.itemInfo}>
                    <span className={styles.itemTitle}>
                      {restaurantStore[i].가게이름}
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
                        {restaurantStore[i].친절도}
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
                        {restaurantStore[i].맛}
                      </span>
                    </span>
                  </span>
                  <span className={styles.itemInfo}>
                    <span>
                      <span>{restaurantStore[i].위치}</span>
                      <span>|</span>
                      <span>{restaurantStore[i].업종}</span>
                    </span>
                    <span>
                      <span>
                        {restaurantStore[i].방문횟수}번 방문
                      </span>
                      <span>|</span>
                      <span>{restaurantStore[i].최근방문날짜}</span>
                    </span>
                  </span>
                </Typography>
              }
            />
            <Divider />
            <Routes>
              <Route
                path={`${item.id}/*`}
                key={item.id}
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

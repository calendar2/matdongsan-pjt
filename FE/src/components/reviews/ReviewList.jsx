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
import axios from 'axios';
import dayjs from 'dayjs';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
import stewImg from '../../assets/images/reviews/stewImg.jpg';
import useGetRegion from '../../hooks/useGetRegion';

function ReviewsList() {
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  // const API_URL = 'http://70.12.246.119:4000';
  const API_URL = 'https://i10a209.p.ssafy.io/api/';
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const {
    setRestaurantStore,
    setMyReviewStore,
    registration,
    update,
    remove,
  } = reviewStore();
  const regions = useGetRegion();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantData, reviewData] = await Promise.all([
          axios.get(`${API_URL}/restaurant/1`), // 1에 유저 id가 들어가야함
          axios.get(`${API_URL}/review/1`), // 1에 유저 id가 들어가야함
        ]);

        const restaurantList = restaurantData.data.map(
          (restaurant) => {
            const filteredRegeion = regions.data.find(
              (region) => region.id === restaurant.regionId
            );
            console.log(filteredRegeion);
            const filteredReview = reviewData.data.filter(
              (review) => review.restaurantId === restaurant.id
            );

            const totalKindnessRating = filteredReview.reduce(
              (sum, review) => sum + review.kindnessRating,
              0
            );

            const averageKindnessRating =
              filteredReview.length > 0
                ? totalKindnessRating / filteredReview.length
                : 0;
            const totalTasteRating = filteredReview.reduce(
              (sum, review) => sum + review.tasteRating,
              0
            );

            const averageTasteRating =
              filteredReview.length > 0
                ? totalTasteRating / filteredReview.length
                : 0;
            const latestVisitDate =
              filteredReview.length > 0
                ? dayjs(
                    new Date(
                      Math.max.apply(
                        null,
                        filteredReview.map(
                          (review) => new Date(review.visitDate)
                        )
                      )
                    ).toISOString()
                  )
                : dayjs('2014-01-01');

            return {
              id: restaurant.id,
              가게이름: restaurant.name,
              위치: filteredRegeion.district,
              업종: '한식',
              친절도: Math.round(averageKindnessRating),
              맛: Math.round(averageTasteRating),
              최근방문날짜: `${latestVisitDate.$y}-${latestVisitDate.$M + 1 >= 10 ? latestVisitDate.$M + 1 : `0${latestVisitDate.$M + 1}`}-${latestVisitDate.$D >= 10 ? latestVisitDate.$D : `0${latestVisitDate.$D}`}`,
              방문횟수: filteredReview.length,
            };
          }
        );

        setRestaurantStore(restaurantList);

        const reviewList = reviewData.data.map((review) => {
          const filteredRestaurant = restaurantList.find(
            (x) => Number(x.id) === Number(review.restaurantId)
          );
          console.log(filteredRestaurant);
          return {
            id: review.restaurantId,
            리뷰id: review.id,
            가게이름: filteredRestaurant
              ? filteredRestaurant.가게이름
              : '', // 일치하는 음식점에서 가게 이름 가져오기
            친절도: review.kindnessRating,
            맛: review.tasteRating,
            업종: filteredRestaurant ? filteredRestaurant.업종 : '', // 일치하는 음식점에서 업종 가져오기
            내용: review.content,
            사진: '사진',
            같이간친구: review.accountReviews,
            임의친구들: review.reviewPersonTags,
            방문한날짜: review.visitDate,
            위치: filteredRestaurant ? filteredRestaurant.위치 : '', // 일치하는 음식점에서 위치 가져오기
          };
        });
        setMyReviewStore(reviewList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log('리뷰 목록 마운트 됨!');
  }, [registration, update, remove]);

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

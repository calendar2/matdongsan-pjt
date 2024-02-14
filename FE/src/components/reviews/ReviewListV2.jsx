import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Avatar,
  ListItemAvatar,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import { useQuery } from 'react-query';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
import urlStore from '../../stores/urlStore';
import userStore from '../../stores/userStore';

const handleScrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const fetchReviewsData = async (API_URL, currentPageID) => {
  const [restaurantData, reviewData, regions] = await Promise.all([
    axios.get(`${API_URL}/restaurant/v2/${currentPageID}`),
    axios.get(`${API_URL}/review/${currentPageID}`),
    axios.get(`${API_URL}/region`),
  ]);

  return {
    restaurantData: restaurantData.data,
    reviewData: reviewData.data,
    regions: regions.data,
  };
};

function ReviewListV2() {
  const {
    setRefresh,
    refresh,
    setMyReviewStore,
    setRestaurantStore,
    restaurantStore,
    sortByVisitCount,
    sortByRecentVisitDate,
    sortByAverageTasteAndKindness,
  } = reviewStore();

  const { currentPageID } = userStore();
  const navigate = useNavigate();

  const { API_URL } = urlStore();
  const { data, error } = useQuery(
    ['reviewsData', currentPageID],
    () => fetchReviewsData(API_URL, currentPageID)
  );

  useEffect(() => {
    if (data) {
      console.log(data.restaurantData, '레스토랑 데이터 요청 성공');

      const restaurantList = data.restaurantData.map((restaurant) => {
        const filteredRegion = data.regions.find(
          (region) => region.id === restaurant.regionId
        );
        const filteredReview = data.reviewData.filter(
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
            : dayjs('2000-01-01');

        return {
          id: restaurant.id,
          가게이름: restaurant.name,
          위치: filteredRegion?.district,
          업종: restaurant.restaurantFoodCategories
            .map((x) => x.name)
            .join(' / '),
          친절도: Math.round(averageKindnessRating),
          맛: Math.round(averageTasteRating),
          최근방문날짜: `${latestVisitDate.format('YYYY-MM-DD')}`,
          방문횟수: filteredReview.length,
          가게사진: restaurant.thumUrl,
        };
      });

      setRestaurantStore(restaurantList);

      const reviewList = data.reviewData.map((review) => {
        const filteredRestaurant = restaurantList.find(
          (x) => Number(x.id) === Number(review.restaurantId)
        );

        return {
          id: review.restaurantId,
          리뷰id: review.id,
          가게이름: filteredRestaurant
            ? filteredRestaurant.가게이름
            : '',
          친절도: review.kindnessRating,
          맛: review.tasteRating,
          업종: filteredRestaurant ? filteredRestaurant.업종 : '',
          내용: review.content,
          사진: '사진',
          같이간친구: review.accountReviews,
          임의친구들: review.reviewPersonTags,
          방문한날짜: review.visitDate,
          위치: filteredRestaurant ? filteredRestaurant.위치 : '',
        };
      });

      setMyReviewStore(reviewList);
    }

    if (error) {
      console.error('Error fetching data:', error);
    }
  }, [data, error]);

  const [reviewListSortButton1, setReviewListSortButton1] =
    useState(true);
  const [reviewListSortButton2, setReviewListSortButton2] =
    useState(false);
  const [reviewListSortButton3, setReviewListSortButton3] =
    useState(false);
  const [selectedList, setSelectedList] = useState();

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.sortBtn}>
          <Button
            variant="text"
            key="sortByRecentVisitDate"
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
            key="sortByVisitCount"
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
            key="sortByAverageTasteAndKindness"
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
        <div>
          <IconButton
            onClick={() => {
              setRefresh(!refresh);
            }}
          >
            <RefreshIcon />
          </IconButton>
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
        {restaurantStore?.map((item, i) => (
          <ListItem
            key={restaurantStore[i].id}
            onClick={() => {
              navigate(`${item.id}/detail`, {
                state: {
                  id: item.id,
                },
              });
              setSelectedList(item.id);
            }}
            className={styles.content}
            button
            id={i}
          >
            <ListItemText
              className={`${styles.contentList} ${item.id === selectedList ? styles.selected : ''}`}
              primary={null}
              secondary={
                <Typography component="div">
                  <ListItemAvatar>
                    <Avatar
                      src={restaurantStore[i]?.가게사진}
                      alt="사진"
                    />
                    {/* 사진 */}
                  </ListItemAvatar>
                  <span className={styles.itemInfo}>
                    <span className={styles.itemTitle}>
                      {restaurantStore[i]?.가게이름}
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
                      {/* <span>|</span> */}
                      {/* <span>{restaurantStore[i].최근방문날짜}</span> */}
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

export default ReviewListV2;

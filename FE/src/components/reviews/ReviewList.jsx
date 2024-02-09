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

import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import dayjs from 'dayjs';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
import urlStore from '../../stores/urlStore';

function ReviewsList() {
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const [refresh, setRefresh] = useState(false);
  const {
    setRestaurantStore,
    setMyReviewStore,
    update,
    remove,
    registration,
  } = reviewStore();

  const { API_URL } = urlStore();
  useEffect(() => {
    console.log('의존성 배열이 변경됐음!');
    const fetchData = async () => {
      try {
        const [restaurantData, reviewData, regions] =
          await Promise.all([
            axios.get(`${API_URL}/restaurant/1`), // 1에 유저 id가 들어가야함
            axios.get(`${API_URL}/review/1`), // 1에 유저 id가 들어가야함
            axios.get(`${API_URL}/region`),
          ]);
        const restaurantList = restaurantData.data.map(
          (restaurant) => {
            const filteredRegeion = regions.data.find(
              (region) => region.id === restaurant.regionId
            );
            const filteredReview = reviewData.data.filter(
              (review) => review.restaurantId === restaurant.id
            );
            console.log(filteredReview);
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
            // const latestVisitDate =
            //   filteredReview.length > 0
            //     ? dayjs(
            //         new Date(
            //           Math.max.apply(
            //             null,
            //             filteredReview.map(
            //               (review) => new Date(review.visitDate)
            //             )
            //           )
            //         ).toISOString()
            //       )
            //     : dayjs('2014-01-01'); // 날짜갱신
            return {
              id: restaurant.id,
              가게이름: restaurant.name,
              위치: filteredRegeion?.district,
              업종: '한식',
              친절도: Math.round(averageKindnessRating),
              맛: Math.round(averageTasteRating),
              // 최근방문날짜: `${latestVisitDate.$y}-${latestVisitDate.$M + 1 >= 10 ? latestVisitDate.$M + 1 : `0${latestVisitDate.$M + 1}`}-${latestVisitDate.$D >= 10 ? latestVisitDate.$D : `0${latestVisitDate.$D}`}`,
              방문횟수: filteredReview.length,
            };
          }
        );

        setRestaurantStore(restaurantList);

        const reviewList = reviewData?.data.map((review) => {
          const filteredRestaurant = restaurantList.find(
            (x) => Number(x.id) === Number(review.restaurantId)
          );
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
            // 방문한날짜: review.visitDate.split('T')[0],
            위치: filteredRestaurant ? filteredRestaurant.위치 : '', // 일치하는 음식점에서 위치 가져오기
          };
        });
        setMyReviewStore(reviewList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [refresh, remove, registration, update]);
  // 로컬
  // const { API_URL } = urlStore();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [restaurantData, reviewData, regions] =
  //         await Promise.all([
  //           axios.get(`${API_URL}/restaurant/1`), // 1에 유저 id가 들어가야함
  //           axios.get(`${API_URL}/review/1`), // 1에 유저 id가 들어가야함
  //           axios.get(`${API_URL}/region`),
  //         ]);
  //       console.log('맛집목록 가져왔음!');
  //       console.log('리뷰목록 가져왔음!');
  //       console.log('지역목록 가져왔음!');
  //       console.log(restaurantData);
  //       const restaurantList = restaurantData.data.map(
  //         (restaurant) => {
  //           const filteredRegeion = regions.data.find(
  //             (region) => region.id === restaurant.region_id
  //           );
  //           const filteredReview = reviewData.data.filter(
  //             (review) => review.restaurant_id === restaurant.id
  //           );
  //           console.log(filteredReview);
  //           const totalKindnessRating = filteredReview.reduce(
  //             (sum, review) => sum + review.kindness_rating,
  //             0
  //           );

  //           const averageKindnessRating =
  //             filteredReview.length > 0
  //               ? totalKindnessRating / filteredReview.length
  //               : 0;
  //           const totalTasteRating = filteredReview.reduce(
  //             (sum, review) => sum + review.taste_rating,
  //             0
  //           );

  //           const averageTasteRating =
  //             filteredReview.length > 0
  //               ? totalTasteRating / filteredReview.length
  //               : 0;
  //           const latestVisitDate =
  //             filteredReview.length > 0
  //               ? dayjs(
  //                   new Date(
  //                     Math.max.apply(
  //                       null,
  //                       filteredReview.map(
  //                         (review) => new Date(review.visit_date)
  //                       )
  //                     )
  //                   ).toISOString()
  //                 )
  //               : dayjs('2014-01-01');
  //           console.log(
  //             '젠킨스서버에서 오는 음식점 API 형식',
  //             restaurant
  //           );

  //           return {
  //             id: restaurant.id,
  //             가게이름: restaurant.name,
  //             위치: filteredRegeion?.district,
  //             업종: '한식',
  //             친절도: Math.round(averageKindnessRating),
  //             맛: Math.round(averageTasteRating),
  //             최근방문날짜: `${latestVisitDate.$y}-${latestVisitDate.$M + 1 >= 10 ? latestVisitDate.$M + 1 : `0${latestVisitDate.$M + 1}`}-${latestVisitDate.$D >= 10 ? latestVisitDate.$D : `0${latestVisitDate.$D}`}`,
  //             방문횟수: filteredReview.length,
  //           };
  //         }
  //       );

  //       setRestaurantStore(restaurantList);

  //       const reviewList = reviewData?.data.map((review) => {
  //         const filteredRestaurant = restaurantList.find(
  //           (x) => Number(x.id) === Number(review.restaurant_id)
  //         );
  //         console.log('젠킨스서버에서 오는 리뷰 API 형식', review);
  //         return {
  //           id: review.restaurant_id,
  //           리뷰id: review.id,
  //           가게이름: filteredRestaurant
  //             ? filteredRestaurant.가게이름
  //             : '', // 일치하는 음식점에서 가게 이름 가져오기
  //           친절도: review.kindness_rating,
  //           맛: review.taste_rating,
  //           업종: filteredRestaurant ? filteredRestaurant.업종 : '', // 일치하는 음식점에서 업종 가져오기
  //           내용: review.content,
  //           사진: '사진',
  //           같이간친구: review.account_reviews,
  //           임의친구들: review.review_person_tags,
  //           // 방문한날짜: review.visit_date.split('T')[0],
  //           위치: filteredRestaurant ? filteredRestaurant.위치 : '', // 일치하는 음식점에서 위치 가져오기
  //         };
  //       });
  //       setMyReviewStore(reviewList);
  //       console.log(reviewList);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  //   console.log('리뷰 목록 마운트 됨!');
  // }, [registration, remove, update]);

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
  const [selectedList, setSelectedList] = useState();
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
          <IconButton>
            <RefreshIcon
              onClick={() => {
                setRefresh(!refresh);
              }}
            />
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
                    <Avatar alt="사진" />
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
export default ReviewsList;

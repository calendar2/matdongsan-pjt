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
import {
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom';

import axios from 'axios';
import dayjs from 'dayjs';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewList.module.css';
import ReviewsListSubItems from './ReviewListSubItems';
import urlStore from '../../stores/urlStore';

function ReviewsList() {
  const {
    restaurantStore,
    sortByVisitCount,
    sortByRecentVisitDate,
    sortByAverageTasteAndKindness,
  } = reviewStore();
  // 음식점 ID를 인자로 입력하면 해당 음식점으로 스크롤 이동한다
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const {
    setRestaurantStore,
    setMyReviewStore,
    refresh,
    setRefresh,
    setIsOwner,
  } = reviewStore();
  const navigate = useNavigate();
  const { userID } = useParams();
  const 로그인한아이디 = 1;
  const [페이지주인아이디, 페이지주인아이디수정] = useState();
  // const [페이지공개여부, 페이지공개여부수정] = useState(false); 리뷰페이지 공개여부, 이건 나중에
  const { API_URL } = urlStore();
  useEffect(() => {
    if (userID !== undefined) {
      페이지주인아이디수정(userID);
      setIsOwner(false);
      console.log('다른사람페이지구경중임!', 페이지주인아이디);
      setTimeout(() => {
        setRefresh();
      }, 5); // 리스트목록갱신
    } else {
      페이지주인아이디수정(로그인한아이디); // 로그인한아이디 입력
      setIsOwner(true);
      console.log('내페이지임!', 페이지주인아이디);
      setTimeout(() => {
        setRefresh(); // 리스트목록갱신
      }, 5);
    }
    const fetchData = async () => {
      try {
        // eslint-disable-next-line eqeqeq
        if (페이지주인아이디 == undefined) {
          return;
        }
        const [restaurantData, reviewData, regions] =
          await Promise.all([
            axios.get(`${API_URL}/restaurant/${페이지주인아이디}`),
            axios.get(`${API_URL}/review/${페이지주인아이디}`),
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
                : dayjs('2000-01-01'); // 날짜갱신
            return {
              id: restaurant.id,
              가게이름: restaurant.name,
              위치: filteredRegeion?.district,
              업종: '한식',
              친절도: Math.round(averageKindnessRating),
              맛: Math.round(averageTasteRating),
              최근방문날짜: `${latestVisitDate.$y}-${latestVisitDate.$M + 1 >= 10 ? latestVisitDate.$M + 1 : `0${latestVisitDate.$M + 1}`}-${latestVisitDate.$D >= 10 ? latestVisitDate.$D : `0${latestVisitDate.$D}`}`,
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
            방문한날짜: review.visitDate,
            위치: filteredRestaurant ? filteredRestaurant.위치 : '', // 일치하는 음식점에서 위치 가져오기
          };
        });
        setMyReviewStore(reviewList);
        sortByRecentVisitDate();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [refresh, navigate]);

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

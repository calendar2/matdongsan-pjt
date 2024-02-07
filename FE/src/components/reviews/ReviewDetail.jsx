import { useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import boy0 from '../../assets/images/reviews/boy0.png';
import boy1 from '../../assets/images/reviews/boy1.png';
import boy2 from '../../assets/images/reviews/boy2.png';
import girl0 from '../../assets/images/reviews/girl0.png';
import girl1 from '../../assets/images/reviews/girl1.png';
import girl2 from '../../assets/images/reviews/girl2.png';
import styles from '../../styles/reviews/ReviewDetail.module.css';
import reviewStore from '../../stores/reviewStore';
import urlStore from '../../stores/urlStore';
import content from '../../styles/foodmap/FoodMapView.module.css';

function ReviewDetail() {
  const icons = [boy0, boy1, boy2, girl0, girl1, girl2];
  const { myReviewStore, remove, setRemove } = reviewStore();
  const { API_URL } = urlStore();
  const navigate = useNavigate();
  const { reviewID, restaurantID } = useParams();
  const filteredReview = myReviewStore.find(
    (x) => x.리뷰id === Number(reviewID)
  );
  return (
    <div className={content.hiddenSpace} key={reviewID}>
      <div className={styles.container}>
        <div>
          <CloseIcon
            onClick={() => {
              navigate('/main/restaurants');
            }}
            sx={{
              position: 'absolute',
              right: '1vw',
              top: '2vh',
              width: '18px',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
          />
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)', fontSize: '25px' }}
          >
            {filteredReview?.가게이름}
          </Typography>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            {filteredReview?.업종}
          </Typography>
        </div>
        <hr />
        <div>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            친절
          </Typography>
          <Rating
            name="read-only"
            value={Number(filteredReview?.친절도)}
            readOnly
            sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
          />
        </div>
        <div>
          <Typography
            component="legend"
            sx={{ color: 'rgba(55,55,55,0.7)' }}
          >
            맛
          </Typography>
          <Rating
            name="read-only"
            value={Number(filteredReview?.맛)}
            readOnly
            sx={{ color: 'rgba(29, 177, 119, 0.7)' }}
          />
        </div>
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          내용
        </Typography>
        <Box
          sx={{
            width: 500,
            maxWidth: '100%',
          }}
          className={styles.content}
        >
          <TextField
            multiline
            fullWidth
            readOnly
            value={filteredReview?.내용}
            color="success"
            underline="none"
          />
        </Box>
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          같이 간 친구
        </Typography>
        {filteredReview?.같이간친구.map((x, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div className={styles.asideContent} key={i}>
            <Avatar
              alt="Remy Sharp"
              src={icons[i]}
              sx={{ backgroundColor: 'rgba(29, 177, 119, 0.3)' }}
            />
            <p className={styles.asideItem}>{x.name}</p>
            <hr />
          </div>
        ))}
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          임의 친구들
        </Typography>
        {filteredReview?.임의친구들.map((x) => (
          <div key={x.name}>{x.name}</div>
        ))}
        <hr />
        <Typography
          component="legend"
          sx={{ color: 'rgba(55,55,55,0.7)' }}
        >
          방문한 날짜
        </Typography>
        <div>{filteredReview?.방문한날짜.split('T')[0]}</div>
        <hr />
        <div className={styles.footer}>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: '130px' }}
            onClick={() => {
              console.log('수정하기 버튼이 눌렸어요!.');
              navigate('update');
            }}
            style={{
              backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
              color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
              fontSize: '1rem', // 버튼의 글자 크기를 조절
              padding: '5px 30px', // 버튼의 내부 여백을 조절
              borderRadius: '20px',
            }}
          >
            수정
          </Button>
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ width: '130px' }}
            onClick={() => {
              console.log('삭제하기 버튼이 눌렸어요!.');
              navigate(`/main/restaurants/${restaurantID}`);
              setTimeout(() => {
                setRemove(!remove);
              }, 500);
              const url = `${API_URL}/review/1/${reviewID}`;
              axios
                .delete(url)
                .then((response) => {
                  console.log('요청 성공:', response.data);
                  // 성공 시 필요한 작업 수행
                })
                .catch((error) => {
                  console.error('요청 실패:', error);
                  // 실패 시 에러 처리
                });
            }}
            style={{
              backgroundColor: 'rgba(29, 177, 119, 0.7)', // 버튼의 배경색을 1db177로 설정
              color: '#ffffff', // 버튼의 글자색을 흰색으로 설정
              fontSize: '1rem', // 버튼의 글자 크기를 조절
              padding: '5px 30px', // 버튼의 내부 여백을 조절
              borderRadius: '20px',
              marginLeft: '10px',
            }}
          >
            <DeleteIcon />
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ReviewDetail;

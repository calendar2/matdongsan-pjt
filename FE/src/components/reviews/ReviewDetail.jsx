import { useNavigate, useParams } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styles from '../../styles/reviews/ReviewDetail.module.css';

function ReviewDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className={styles.modal}>
      <IconButton>
        <CloseIcon
          onClick={() => {
            navigate('/main/restaurants');
          }}
        />
      </IconButton>
      <div>리뷰상세페이지입니다</div>
      <div>{id}</div>
      <div>가게이름</div>
      <div>몇번째방문인가</div>
      <div>친절도</div>
      <div>맛</div>
      <div>업종</div>
      <div>내용</div>
      <div>내용</div>
      <div>사진</div>
      <div>같이간친구</div>
      <div>방문한날짜</div>
    </div>
  );
}

export default ReviewDetail;

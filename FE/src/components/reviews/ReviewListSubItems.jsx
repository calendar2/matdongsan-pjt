import {
  List,
  Avatar,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from 'react';
import sleepy from '../../assets/images/reviews/sleepy.png';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewListSubItems.module.css';
import userStore from '../../stores/userStore';

function ReviewListSubItems(props) {
  const { myReviewStore } = reviewStore();
  const { isMyPage } = userStore();
  const { id } = props;
  const { userID } = useParams();
  const navigate = useNavigate();
  const filteredSubItems = myReviewStore.filter(
    (x) => x.id === Number(id)
  );
  const [selectedListItem, setSelectedListItem] = useState();
  return (
    <div>
      <div className={styles.btn}>
        {isMyPage && (
          <Button
            type="submit"
            variant="text"
            onClick={(e) => {
              e.stopPropagation();
              navigate('write');
            }}
            sx={{
              color: 'rgba(55,55,55,0.7)',
              '&:hover': {
                backgroundColor: 'transparent', // 배경색을 투명하게 설정
              },
            }}
          >
            +
          </Button>
        )}
      </div>
      {filteredSubItems?.length > 0 ? (
        <div>
          <List>
            {filteredSubItems?.map((x, i) => (
              <ListItem
                key={[filteredSubItems[i].리뷰id]}
                className={`${styles.container} ${x.리뷰id === selectedListItem ? styles.selected : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(x.리뷰id, '번 상세페이지 클릭했음!');
                  navigate(`reviews/${x.리뷰id}`);
                  setSelectedListItem(x.리뷰id);
                }}
              >
                <ListItemAvatar>
                  <Avatar alt="사진" src={x.사진} />
                </ListItemAvatar>
                <ListItemText
                  primary={null}
                  secondary={
                    <Typography component="div">
                      <span className={styles.content}>
                        <span>
                          {x.내용.length > 10
                            ? `${x.내용.substring(0, 10)}...`
                            : x.내용}
                        </span>
                        <span>{x.방문한날짜}</span>
                      </span>
                      <span className={styles.info}>
                        {x.임의친구들?.map((y) => (
                          <div key={y.name}>{y.name}</div>
                        ))}
                      </span>
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
          <div className={styles.btn}>
            {/* <IconButton> */}
            <ArrowDropUpIcon
              onClick={(e) => {
                e.stopPropagation();
                if (isMyPage) {
                  navigate('/main/restaurants');
                } else {
                  navigate(`/main/users/${userID}/restaurants`);
                }
              }}
              sx={{
                color: 'rgba(55,55,55,0.7)',
              }}
            />
            {/* </IconButton> */}
          </div>
        </div>
      ) : (
        <div className={styles.btn}>
          <img src={sleepy} alt="" width={75} />
        </div>
      )}
    </div>
  );
}

export default ReviewListSubItems;

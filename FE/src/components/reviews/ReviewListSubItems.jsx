import {
  List,
  Avatar,
  ListItemText,
  ListItem,
  ListItemAvatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import reviewStore from '../../stores/reviewStore';
import styles from '../../styles/reviews/ReviewListSubItems.module.css';

function ReviewListSubItems(props) {
  const { reviewListSubItems } = reviewStore();
  const { id } = props;
  const navigate = useNavigate();
  const filteredSubItems = reviewListSubItems.filter(
    (x) => x.id === id
  );
  return (
    <div>
      <button
        type="submit"
        onClick={(e) => {
          e.stopPropagation();
          navigate('write');
        }}
      >
        등록하기
      </button>
      <List>
        {filteredSubItems.map((x) => (
          <ListItem
            key={x.리뷰id}
            className={styles.decorateListItem}
            onClick={(e) => {
              e.stopPropagation();
              console.log(x.리뷰id, '번 상세페이지 클릭했음!');
              navigate(`reviews/${x.리뷰id}`);
            }}
          >
            <ListItemAvatar>
              <Avatar alt="사진" src={x.사진} />
            </ListItemAvatar>
            <ListItemText
              primary={null}
              secondary={
                <>
                  <span className={styles.listItemTitle}>
                    <span>
                      {x.내용.length > 10
                        ? `${x.내용.substring(0, 10)}...`
                        : x.내용}
                    </span>
                    <span>{x.방문한날짜}</span>
                  </span>
                  <span className={styles.listItemContent}>
                    {x.같이간친구}
                  </span>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <div className={styles.center}>
        <ArrowDropUpIcon
          onClick={(e) => {
            e.stopPropagation();
            navigate('/main/restaurants');
          }}
        />
      </div>
    </div>
  );
}

export default ReviewListSubItems;

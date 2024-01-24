import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/reviews/ReviewsSearchStore.module.css';

function ReviewsSearchStore(props) {
  const { whereIsStore, setWhereIs } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whereIsStore === 2) {
            setWhereIs(0);
          } else {
            setWhereIs(2);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whereIsStore === 2
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whereIsStore === 2 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        업종
        <IconButton>
          <ExpandMoreIcon sx={{ width: '10px' }} />
        </IconButton>
      </Button>
    </span>
  );
}

function StoreModal() {
  return <div className={styles.modal}>업종 검색</div>;
}

export { StoreModal, ReviewsSearchStore };

import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/reviews/ReviewsSearchLocation.module.css';

function ReviewsSearchLocation(props) {
  const { whereIsLocation, setWhereIsLocation } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whereIsLocation === 3) {
            setWhereIsLocation(0);
          } else {
            setWhereIsLocation(3);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whereIsLocation === 3
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whereIsLocation === 3 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        장소
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}
function LocationModal() {
  return <div className={styles.modal}>장소 검색</div>;
}
export { ReviewsSearchLocation, LocationModal };

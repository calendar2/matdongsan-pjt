import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../styles/reviews/ReviewsSearchStore.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

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
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}

function StoreModal() {
  const { selectedStore, storeCategory, setSelectedStore } =
    reviewFilterStore();
  return (
    <div className={styles.modal}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={storeCategory}
        onChange={(e, name) => {
          setSelectedStore(name.label);
          console.log(selectedStore);
          console.log('업종선택되었습니다');
        }}
        sx={{ width: 300 }}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="업종" />
        )}
      />
    </div>
  );
}

export { StoreModal, ReviewsSearchStore };

import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../styles/reviews/ReviewSearchLocation.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

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
  const {
    userLocation,
    selectedUserLocation,
    setSelectedUserLocation,
  } = reviewFilterStore();
  return (
    <div className={styles.modal}>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={userLocation.map((option) => option.title)}
        onChange={(e, name) => {
          setSelectedUserLocation(name);
          console.log(selectedUserLocation);
          console.log('장소선택되었습니다!');
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="장소 검색"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </div>
  );
}
export { ReviewsSearchLocation, LocationModal };

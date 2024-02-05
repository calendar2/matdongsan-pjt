import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../styles/modals/ReviewSearchLocation.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchLocation(props) {
  const { whatIsClicked, setClicked } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whatIsClicked === 3) {
            setClicked(0);
          } else {
            setClicked(3);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whatIsClicked === 3
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whatIsClicked === 3 ? '#FFFFFF' : '#555558',
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
    <div className={styles.wrapper}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={userLocation.map((option) => option.title)}
        onChange={(e, name) => {
          setSelectedUserLocation(name);
          console.log(selectedUserLocation);
          console.log('장소선택되었습니다!');
        }}
        sx={{
          width: 300,
          height: 50,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
            },
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
          },
        }}
        renderInput={(params) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <TextField {...params} label="장소" />
        )}
      />
      {selectedUserLocation !== '' &&
      selectedUserLocation !== null ? (
        <div className={styles.aside}>{selectedUserLocation}</div>
      ) : null}
    </div>
  );
}
export { ReviewsSearchLocation, LocationModal };

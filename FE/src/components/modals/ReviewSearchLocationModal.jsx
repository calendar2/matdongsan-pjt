import { Button, InputAdornment } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/modals/ReviewSearchLocation.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';
import useGetRegion from '../../hooks/useGetRegion';

function ReviewsSearchLocation(props) {
  const { whatIsClicked, setClicked } = props;
  return (
    <span>
      <Button
        type="button"
        size="small"
        onClick={() => {
          if (whatIsClicked === 3) {
            setClicked(0);
          } else {
            setClicked(3);
          }
        }}
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
  const getRegion = useGetRegion();
  console.log(getRegion?.data);

  const defaultProps = {
    options: getRegion?.data,
    getOptionLabel: (option) => option.district,
  };

  const handleAutocompleteChange = (e) => {
    setSelectedUserLocation(e.target.outerText);
    console.log('로케이션', userLocation);
  };
  return (
    <div className={styles.wrapper}>
      <Autocomplete
        id="free-solo-2-demo"
        freeSolo
        includeInputInList
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...defaultProps}
        onChange={handleAutocompleteChange}
        sx={{
          width: '300px',
          '& .MuiInputBase-root': {
            padding: '1px',
            paddingTop: '4px',
            // borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
            borderRadius: '0',
            '&:hover': {
              // borderBottom: '1px solid rgba(0, 0, 0, 0.5)',
            },
            fontSize: '14px',
            color: 'rgba(29, 177, 119)',
            // border: '1px dashed red',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },
          '& .MuiInput-root::after': {
            borderBottom: '2px solid rgba(29, 177, 119, 0.5)',
          },
        }}
        // disableClearable
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="읍/면/동으로 검색해주세요"
            variant="standard"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    style={{ color: 'rgba(217, 217, 217)' }}
                  />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: {
                fontSize: '14px',
                color: 'rgba(217, 217, 217)',
                paddingLeft: '0px',
              },
            }}
          />
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

import { TextField, InputAdornment, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import {
  ReviewsSearchTogether,
  TogetherModal,
} from '../modals/ReviewSearchTogetherModal';
import {
  ReviewsSearchBusinessTypes,
  StoreModal,
} from '../modals/ReviewSearchBusinessTypesModal';
import {
  ReviewsSearchLocation,
  LocationModal,
} from '../modals/ReviewSearchLocationModal';
import {
  TimeModal,
  ReviewsSearchTime,
} from '../modals/ReviewSearchTimeModal';
import styles from '../../styles/reviews/ReviewSearch.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearch() {
  const [whatIsClicked, setClicked] = useState(0);
  const {
    selectedFriend,
    selectedStartDate,
    selectedEndDate,
    selectedBusinessTypes,
    selectedUserLocation,
    setSearchKeyWord,
    searchKeyWord,
  } = reviewFilterStore();
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log('엔터버튼 눌렀음!');
      console.log(
        selectedFriend,
        selectedStartDate,
        selectedEndDate,
        selectedBusinessTypes,
        selectedUserLocation,
        searchKeyWord
      );
    }
  };
  return (
    <div className={styles.layout}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="검색"
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            backgroundColor: '#f4f2f2',
            color: '#b9b9b9',
            marginBottom: '20px',
            height: '40px',
          },
          '& input::placeholder': {
            textAlign: 'center',
            marginRight: '30px',
          },
        }}
        color="success"
        onKeyPress={handleKeyPress}
        onChange={(e) => {
          console.log(searchKeyWord);
          setSearchKeyWord(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  console.log('검색버튼 클릭함!');
                  console.log(
                    selectedFriend,
                    selectedStartDate,
                    selectedEndDate,
                    selectedBusinessTypes,
                    selectedUserLocation
                  );
                }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <div className={styles.wrapper}>
        <ReviewsSearchTogether
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchBusinessTypes
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchLocation
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
        <ReviewsSearchTime
          whatIsClicked={whatIsClicked}
          setClicked={setClicked}
        />
      </div>
      {whatIsClicked === 1 ? (
        <TogetherModal whatIsClicked={whatIsClicked} />
      ) : null}
      {whatIsClicked === 2 ? <StoreModal /> : null}
      {whatIsClicked === 3 ? <LocationModal /> : null}
      {whatIsClicked === 4 ? <TimeModal /> : null}
    </div>
  );
}

export default ReviewsSearch;

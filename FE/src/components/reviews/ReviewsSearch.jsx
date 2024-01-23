import { TextField, InputAdornment, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import {
  ReviewsSearchTogether,
  TogetherModal,
} from './ReviewsSearchTogether';
import { ReviewsSearchStore, StoreModal } from './ReviewsSearchStore';
import {
  ReviewsSearchLocation,
  LocationModal,
} from './ReviewSearchLocation';
import { TimeModal, ReviewsSearchTime } from './ReviewSearchTime';

function ReviewsSearch() {
  const [whoIsTogether, setWhoIs] = useState(false);
  const [whereIsStore, setWhereIs] = useState(false);
  const [whereIsLocation, setWhereIsLocation] = useState(false);
  const [whenTime, setWhenTime] = useState(false);
  return (
    <div style={{ margin: '20px' }}>
      <TextField
        id="outlined-basic"
        variant="outlined"
        placeholder="검색"
        sx={{
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'black ',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent', // 테두리를 투명하게 설정
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            backgroundColor: '#f4f2f2',
            color: '#b9b9b9',
          },
          '& input::placeholder': {
            textAlign: 'center', // placeholder를 중앙 정렬
            marginRight: '30px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <ReviewsSearchTogether
        whoIsTogether={whoIsTogether}
        setWhoIs={setWhoIs}
      />
      <ReviewsSearchStore
        whereIsStore={whereIsStore}
        setWhereIs={setWhereIs}
      />
      <ReviewsSearchLocation
        whereIsLocation={whereIsLocation}
        setWhereIsLocation={setWhereIsLocation}
      />
      <ReviewsSearchTime
        whenTime={whenTime}
        setWhenTime={setWhenTime}
      />
      {whenTime === true ? <TimeModal /> : null}
      {whereIsLocation === true ? <LocationModal /> : null}
      {whereIsStore === true ? <StoreModal /> : null}
      {whoIsTogether === true ? <TogetherModal /> : null}
    </div>
  );
}

export default ReviewsSearch;

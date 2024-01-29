import { TextField, InputAdornment, IconButton } from '@mui/material';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import {
  ReviewsSearchTogether,
  TogetherModal,
} from './ReviewSearchTogether';
import {
  ReviewsSearchBusinessTypes,
  StoreModal,
} from './ReviewSearchBusinessTypes';
import {
  ReviewsSearchLocation,
  LocationModal,
} from './ReviewSearchLocation';
import { TimeModal, ReviewsSearchTime } from './ReviewSearchTime';
import styles from '../../styles/reviews/ReviewSearch.module.css';

function ReviewsSearch() {
  const [whatIsClicked, setClicked] = useState(0);
  return (
    <div className={styles.layout}>
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
            marginBottom: '20px',
            height: '40px',
          },
          '& input::placeholder': {
            textAlign: 'center', // placeholder를 중앙 정렬
            marginRight: '30px',
          },
        }}
        onChange={(e) => {
          console.log('검색 키워드 입력중!');
          console.log(e.target.value);
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton
                onClick={() => {
                  console.log('검색버튼 클릭함!');
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
          whoIsTogether={whatIsClicked}
          setWhoIs={setClicked}
        />
        <ReviewsSearchBusinessTypes
          whatIsBusinessTypes={whatIsClicked}
          setWhatIs={setClicked}
        />
        <ReviewsSearchLocation
          whereIsLocation={whatIsClicked}
          setWhereIsLocation={setClicked}
        />
        <ReviewsSearchTime
          whenTime={whatIsClicked}
          setWhenTime={setClicked}
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

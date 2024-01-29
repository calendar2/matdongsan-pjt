import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import styles from '../../styles/reviews/ReviewSearchTogether.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchTogether(props) {
  const { setWhoIs, whoIsTogether } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whoIsTogether === 1) {
            setWhoIs(0);
          } else {
            setWhoIs(1);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whoIsTogether === 1
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whoIsTogether === 1 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        친구
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}

function TogetherModal() {
  const { userFriend, setSelectedFriend, selectedFriend } =
    reviewFilterStore();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    setSelectedFriend(selectedOptions.map((option) => option.title));
    console.log('같이 간 사람을 선택했습니다!', selectedFriend);
  };
  return (
    <div className={styles.modal}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={userFriend}
        getOptionLabel={(option) => option.title}
        size="small"
        filterSelectedOptions
        onChange={handleAutocompleteChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            color: '#555558',
            paddingTop: '0px',
            paddingBottom: '0px',
            marginLeft: '0px',
            marginRight: '3px',
            marginTop: '-10px',
            width: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          },
        }}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="검색"
            placeholder=""
            sx={{
              textAlign: 'center',
              display: 'block',
            }}
          />
        )}
      />
    </div>
  );
}
export { ReviewsSearchTogether, TogetherModal };

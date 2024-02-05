import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import styles from '../../styles/modals/ReviewSearchTogether.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';
import boy0 from '../../assets/images/reviews/boy0.png';
import boy1 from '../../assets/images/reviews/boy1.png';
import boy2 from '../../assets/images/reviews/boy2.png';
import girl0 from '../../assets/images/reviews/girl0.png';
import girl1 from '../../assets/images/reviews/girl1.png';
import girl2 from '../../assets/images/reviews/girl2.png';

function ReviewsSearchTogether(props) {
  const { setClicked, whatIsClicked } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whatIsClicked === 1) {
            setClicked(0);
          } else {
            setClicked(1);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whatIsClicked === 1
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whatIsClicked === 1 ? '#FFFFFF' : '#555558',
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
  const icons = [boy0, boy1, boy2, girl0, girl1, girl2];
  const { userFriend, setSelectedFriend, selectedFriend } =
    reviewFilterStore();
  const handleAutocompleteChange = (event, selectedOptions) => {
    // 선택된 항목을 setSelectedFriend 함수의 인자로 전달
    setSelectedFriend(selectedOptions.map((option) => option.title));
    console.log('같이 간 사람을 선택했습니다!', selectedFriend);
  };
  return (
    <div className={styles.wrapper}>
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
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(29, 177, 119, 0.5)', // 클릭되었을 때 테두리 색상
            },
          },
          '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
            color: 'rgba(29, 177, 119, 0.5)', // 텍스트가 상단으로 이동할 때의 색상
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
      {selectedFriend.map((x, i) => (
        <div className={styles.content} key={selectedFriend[i]}>
          <Avatar
            alt="Remy Sharp"
            src={icons[i]}
            sx={{ backgroundColor: 'rgba(29, 177, 119, 0.3)' }}
          />
          <p className={styles.item}>{x}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
export { ReviewsSearchTogether, TogetherModal };

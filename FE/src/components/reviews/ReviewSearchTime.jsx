import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../../styles/reviews/ReviewSearchTime.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchTime(props) {
  const { whatIsClicked, setClicked } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whatIsClicked === 4) {
            setClicked(0);
          } else {
            setClicked(4);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whatIsClicked === 4
              ? 'rgba(29, 177, 119, 0.7)'
              : '#ffffff',
          color: whatIsClicked === 4 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        날짜
        <ExpandMoreIcon sx={{ width: '10px' }} />
      </Button>
    </span>
  );
}
function TimeModal() {
  const {
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
  } = reviewFilterStore();
  return (
    <div className={styles.modal}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label="시작 날짜"
            value={selectedStartDate}
            onChange={(newValue) => {
              setSelectedStartDate(newValue);
              console.log('시작 날짜 변경됨!', selectedStartDate.$d);
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green', // 클릭되었을 때 테두리 색상
                },
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                color: 'green', // 텍스트가 상단으로 이동할 때의 색상
              },
            }}
          />
          <DatePicker
            label="종료 날짜"
            value={selectedEndDate}
            onChange={(newValue) => {
              setSelectedEndDate(newValue);
              console.log('종료 날짜 변경됨!', selectedEndDate.$d);
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'green', // 클릭되었을 때 테두리 색상
                },
              },
              '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                color: 'green', // 텍스트가 상단으로 이동할 때의 색상
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
export { TimeModal, ReviewsSearchTime };

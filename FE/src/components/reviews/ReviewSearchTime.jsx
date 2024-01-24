import { Button } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from '../../styles/reviews/ReviewsSearchTime.module.css';
import reviewFilterStore from '../../stores/reviewFilterStore';

function ReviewsSearchTime(props) {
  const { whenTime, setWhenTime } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          if (whenTime === 4) {
            setWhenTime(0);
          } else {
            setWhenTime(4);
          }
        }}
        size="small"
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor:
            whenTime === 4 ? 'rgba(29, 177, 119, 0.7)' : '#ffffff',
          color: whenTime === 4 ? '#FFFFFF' : '#555558',
          paddingTop: '0px',
          paddingBottom: '0px',
          marginLeft: '3px',
          marginRight: '3px',
        }}
      >
        날짜
        <IconButton>
          <ExpandMoreIcon sx={{ width: '10px' }} />
        </IconButton>
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
          />
          <DatePicker
            label="종료 날짜"
            value={selectedEndDate}
            onChange={(newValue) => {
              setSelectedEndDate(newValue);
              console.log('종료 날짜 변경됨!', selectedEndDate.$d);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
}
export { TimeModal, ReviewsSearchTime };

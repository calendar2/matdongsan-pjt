import { Button } from '@mui/material';

function ReviewsSearchTime(props) {
  const { whenTime, setWhenTime } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          setWhenTime(!whenTime);
        }}
      >
        시간
      </Button>
    </span>
  );
}
function TimeModal() {
  return <div>시간 검색</div>;
}
export { TimeModal, ReviewsSearchTime };

import { Button } from '@mui/material';

function ReviewsSearchTogether(props) {
  const { setWhoIs, whoIsTogether } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          setWhoIs(!whoIsTogether);
        }}
        variant="contained"
        style={{
          borderRadius: '20px',
          backgroundColor: '#ffffff',
          color: '#555558',
        }}
      >
        같이 간 사람
      </Button>
    </span>
  );
}

function TogetherModal() {
  return <div>같이간사람 검색</div>;
}
export { ReviewsSearchTogether, TogetherModal };

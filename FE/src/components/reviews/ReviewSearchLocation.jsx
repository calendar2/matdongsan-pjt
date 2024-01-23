import { Button } from '@mui/material';

function ReviewsSearchLocation(props) {
  const { whereIsLocation, setWhereIsLocation } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          setWhereIsLocation(!whereIsLocation);
        }}
      >
        장소
      </Button>
    </span>
  );
}
function LocationModal() {
  return <div>장소 검색</div>;
}
export { ReviewsSearchLocation, LocationModal };

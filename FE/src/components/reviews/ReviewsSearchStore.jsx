import { Button } from '@mui/material';

function ReviewsSearchStore(props) {
  const { whereIsStore, setWhereIs } = props;
  return (
    <span>
      <Button
        type="button"
        onClick={() => {
          setWhereIs(!whereIsStore);
        }}
      >
        업종
      </Button>
    </span>
  );
}

function StoreModal() {
  return <div>업종 검색</div>;
}

export { StoreModal, ReviewsSearchStore };

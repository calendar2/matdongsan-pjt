import reviewStore from '../../stores/reviewStore';

function ReviewsListSubItems(props) {
  const { reviewListSubItems } = reviewStore();
  const { id } = props;
  const filteredSubItems = reviewListSubItems.filter(
    (x) => x.id === id
  );
  return (
    <div>
      {filteredSubItems.map((x) => (
        <div key={x.id}>
          <div>{x.가게이름}</div>
          <div>{x.업종}</div>
          <div>{x.내용}</div>
          <div>{x.같이간친구}</div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsListSubItems;

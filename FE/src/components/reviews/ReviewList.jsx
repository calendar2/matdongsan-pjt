import reviewStore from '../../stores/reviewStore';

function ReviewsList() {
  const { reviewStoreList } = reviewStore();
  return (
    <div>
      <div>
        <article>
          {reviewStoreList.map((item, i) => (
            <div key={reviewStoreList[i].가게이름}>
              <div>가게이름: {reviewStoreList[i].가게이름}</div>
              <div>업종 : {reviewStoreList[i].업종}</div>
              <div>친절도 : {reviewStoreList[i].친절도}</div>
              <div>맛 : {reviewStoreList[i].맛}</div>
              <div>위치 : {reviewStoreList[i].위치}</div>
              <div> 하위 기록(클릭하면 나타남)</div>
            </div>
          ))}
        </article>
      </div>
    </div>
  );
}

export default ReviewsList;

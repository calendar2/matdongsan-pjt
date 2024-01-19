import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import contents from '../styles/foodmap/FoodMapView.module.css';

function FoodMapView() {
  return (
    <div>
      <Header />
      <main className={contents}>
        <SideBar />
        <article>기록과 팔로워 있는 곳</article>
        <FoodMap />
      </main>
    </div>
  );
}

export default FoodMapView;

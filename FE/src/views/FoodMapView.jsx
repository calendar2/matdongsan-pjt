import { Routes, Route } from 'react-router-dom';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Review';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';
import ReviewRegistration from '../components/reviews/ReviewRegistration';
import ReviewDetail from '../components/reviews/ReviewDetail';
import DongsanModal from '../components/modals/DongsanModal';

function FoodMapView() {
  return (
    <div className={contents.container}>
      <Header />
      <main className={contents.wrapper}>
        <SideBar />
        <Routes>
          <Route path="/restaurants/*" element={<Reviews />} />
          <Route path="/followers" element={<Subscribe />} />
        </Routes>
        <div>
          <Routes>
            <Route
              path="/restaurants/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:id"
              element={<ReviewDetail />}
            />
          </Routes>
          <FoodMap />
          <DongsanModal />
        </div>
      </main>
    </div>
  );
}

export default FoodMapView;

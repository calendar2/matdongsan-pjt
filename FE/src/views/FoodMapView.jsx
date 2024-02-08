import { Routes, Route } from 'react-router-dom';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Review';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';
import ReviewRegistration from '../components/reviews/ReviewRegistration';
import ReviewDetail from '../components/reviews/ReviewDetail';
import ReviewUpdate from '../components/reviews/ReviewUpdate';
import DongsanModal from '../components/modals/DongsanModal';
import Following from '../components/subscribe/Following';
import Follower from '../components/subscribe/Follower';
import RestaurantDetail from '../components/restaurants/RestaurantDetail';

function FoodMapView() {
  return (
    <div className={contents.container}>
      <Header />
      <main className={contents.wrapper}>
        <SideBar />
        <Routes>
          <Route path="/restaurants/*" element={<Reviews />} />
          <Route path="/subscribe" element={<Subscribe />}>
            <Route index element={<Following />} />
            <Route path="followings" element={<Following />} />
            <Route path="followers" element={<Follower />} />
          </Route>
        </Routes>
        <div>
          <Routes>
            <Route
              path="/restaurants/:restaurantID/detail"
              element={<RestaurantDetail />}
            />
            <Route
              path="/restaurants/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/write"
              element={<ReviewRegistration />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID"
              element={<ReviewDetail />}
            />
            <Route
              path="/restaurants/:restaurantID/reviews/:reviewID/update"
              element={<ReviewUpdate />}
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

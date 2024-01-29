import { Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Review';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';

function FoodMapView() {
  // const [check, setCheck] = useState(0);

  return (
    <div className={contents.container}>
      <Header />
      <main className={contents.wrapper}>
        {/* <SideBar setCheck={setCheck} /> */}
        <SideBar />
        {/* {check === 0 ? <Reviews /> : <Subscribe />} */}
        <Routes>
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/followers" element={<Subscribe />} />
        </Routes>
        <FoodMap />
      </main>
    </div>
  );
}

export default FoodMapView;

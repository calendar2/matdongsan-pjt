// import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/layouts/Header';
import SideBar from '../components/foodmap/SideBar';
import FoodMap from '../components/foodmap/FoodMap';
import Reviews from '../components/reviews/Reviews';
import Subscribe from '../components/subscribe/Subscribe';
import contents from '../styles/foodmap/FoodMapView.module.css';

function FoodMapView() {
  const [check, setCheck] = useState(0);

  return (
    <div>
      <Header />
      <main className={contents.wrapper}>
        <SideBar setCheck={setCheck} />
        {check === 0 ? <Reviews /> : <Subscribe />}
        <FoodMap />
      </main>
    </div>
  );
}

export default FoodMapView;

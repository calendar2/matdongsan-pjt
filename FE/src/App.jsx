import { Routes, Route } from 'react-router-dom';
import StartView from './views/StartView';
import FoodMapView from './views/FoodMapView';
import SignupView from './views/SignupView';

function App() {
  return (
    <Routes>
      {/* 로그인 했을 때는 이 레이아웃으로 */}
      <Route path="/main" element={<FoodMapView />} />

      {/* 로그인 하지않았을 때는 이 레이아웃으로 */}
      <Route path="/" element={<StartView />} />
      <Route path="/signup" element={<SignupView />} />
    </Routes>
  );
}
export default App;

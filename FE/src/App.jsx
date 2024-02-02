import { Routes, Route } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import StartView from './views/StartView';
import FoodMapView from './views/FoodMapView';
import SignupView from './views/SignupView';
import useGetRegion from './hooks/useGetRegion';

function App() {
  useGetRegion();

  return (
    <div>
      <Routes>
        {/* 로그인 했을 때는 이 레이아웃으로 */}
        <Route path="/main/*" element={<FoodMapView />} />

        {/* 로그인 하지않았을 때는 이 레이아웃으로 */}
        <Route path="/" element={<StartView />} />
        <Route path="/signup" element={<SignupView />} />
      </Routes>
      <ReactQueryDevtools
        initialIsOpen={false}
        position="bottom-right"
      />
    </div>
  );
}
export default App;

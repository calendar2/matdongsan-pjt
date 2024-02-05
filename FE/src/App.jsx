import { Routes, Route } from 'react-router-dom';
import StartView from './views/StartView';
import FoodMapView from './views/FoodMapView';
import SignupView from './views/SignupView';
// import Redirect from './components/accounts/Redirect';
import EditProfileView from './views/EditProfileView';
import SocialLogin from './components/accounts/SocialLogin';

function App() {
  return (
    <Routes>
      {/* 로그인 했을 때는 이 레이아웃으로 */}
      <Route path="/main/*" element={<FoodMapView />} />
      {/* 로그인 하지않았을 때는 이 레이아웃으로 */}
      <Route path="*" element={<StartView />} />
      <Route path="/sociallogin" element={<SocialLogin />} />
      <Route path="/signup" element={<SignupView />} />
      <Route path="/editprofile" element={<EditProfileView />} />
    </Routes>
  );
}
export default App;

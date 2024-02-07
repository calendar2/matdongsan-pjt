import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import urlStore from '../../stores/urlStore';
import content from '../../styles/foodmap/FoodMapView.module.css';
import detail from '../../styles/restaurants/RestaurantDetail.module.css';

function RestaurantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state.id;
  const { API_URL } = urlStore();
  // console.log(restaurantId);

  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isPresent, setIsPresent] = useState(0);

  const deleteMyRestaurant = () => {
    axios({
      method: 'delete',
      url: `${API_URL}/restaurant/1/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 삭제', res);
        navigate(`/main/restaurants/${restaurantId}`, {
          state: {
            id: restaurantId,
          },
        });
      })
      .catch((err) => {
        console.error('가게 삭제ㅠㅠ', err);
      });
  };

  const registerMyRestaurant = () => {
    axios({
      method: 'post',
      url: `${API_URL}/restaurant/1?restaurantId=${restaurantId}`,
    })
      .then((res) => {
        console.log('내 맛집 등록', res);
        navigate(`/main/restaurants/${restaurantId}`, {
          state: {
            id: restaurantId,
          },
        });
      })
      .catch((err) => {
        console.error('내 맛집 등록ㅠㅠ', err);
      });
  };

  useEffect(() => {
    // 가게 상세 정보 가져오기
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/common/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 상세 정보', res);
        setAddress(res.data.address);
        setName(res.data.name);
        setPhone(res.data.phone);
      })
      .catch((err) => {
        console.error('가게 상세 정보 실패ㅠㅠ', err);
      });

    // 해당 가게가 내 맛집으로 저장되어있는지?
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/1/${restaurantId}`,
    })
      .then((res) => {
        console.log('내 맛집?', res);
        setIsPresent(res.data.isPresent);
      })
      .catch((err) => {
        console.error('내 맛집ㅠㅠ', err);
      });
  }, [restaurantId, deleteMyRestaurant, registerMyRestaurant]);

  return (
    <div className={content.hiddenSpace}>
      <div className={detail.container}>
        <div className={detail.wrapper}>
          <h3>{name}</h3>
          {isPresent === 1 ? (
            <StarRoundedIcon
              className={detail.btn}
              sx={{ color: '#1DB177' }}
              onClick={deleteMyRestaurant}
            />
          ) : (
            <StarOutlineRoundedIcon
              className={detail.btn}
              sx={{ color: '#1DB177' }}
              onClick={registerMyRestaurant}
            />
          )}
        </div>
        <div>사진</div>
        <div>{address}</div>
        <div>{phone}</div>
        <div>메뉴</div>
      </div>
    </div>
  );
}

export default RestaurantDetail;

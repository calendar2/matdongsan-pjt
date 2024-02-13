import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import CloseIcon from '@mui/icons-material/Close';
import urlStore from '../../stores/urlStore';
import content from '../../styles/foodmap/FoodMapView.module.css';
import detail from '../../styles/restaurants/RestaurantDetail.module.css';
import userStore from '../../stores/userStore';

function RestaurantDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const restaurantId = location.state.id;
  const { API_URL } = urlStore();
  // console.log(restaurantId);
  const { loginAccount } = userStore();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isPresent, setIsPresent] = useState(0);
  const [thum, setThum] = useState('');
  const [menus, setMenus] = useState('');
  const [categories, setCategories] = useState([]);
  const [menuList, setMenuList] = useState([]);

  const deleteMyRestaurant = useCallback(() => {
    axios({
      method: 'delete',
      url: `${API_URL}/restaurant/${loginAccount.id}/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 삭제', res);
        navigate(`/main/restaurants/${restaurantId}/detail`, {
          state: {
            id: restaurantId,
          },
        });
      })
      .catch((err) => {
        console.error('가게 삭제ㅠㅠ', err);
      });
  }, [API_URL, navigate, restaurantId]);

  const registerMyRestaurant = useCallback(() => {
    axios({
      method: 'post',
      url: `${API_URL}/restaurant/${loginAccount.id}?restaurantId=${restaurantId}`,
    })
      .then((res) => {
        console.log('내 맛집 등록', res);
        navigate(`/main/restaurants/${restaurantId}/detail`, {
          state: {
            id: restaurantId,
          },
        });
      })
      .catch((err) => {
        console.error('내 맛집 등록ㅠㅠ', err);
      });
  }, [API_URL, navigate, restaurantId]);

  useEffect(() => {
    // 가게 상세 정보 가져오기
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/common/v2/${restaurantId}`,
    })
      .then((res) => {
        console.log('가게 상세 정보', res);
        setAddress(res.data.address);
        setName(res.data.name);
        setPhone(res.data.phone);
        setThum(res.data.thumUrl);
        setMenus(res.data.menuInfo);
        setCategories(res.data.restaurantFoodCategories);
      })
      .catch((err) => {
        console.error('가게 상세 정보 실패ㅠㅠ', err);
      });

    // 해당 가게가 내 맛집으로 저장되어있는지?
    axios({
      method: 'get',
      url: `${API_URL}/restaurant/${loginAccount.id}/${restaurantId}`,
    })
      .then((res) => {
        console.log('내 맛집?', res);
        setIsPresent(res.data.isPresent);
      })
      .catch((err) => {
        console.error('내 맛집ㅠㅠ', err);
      });
  }, [location]);

  useEffect(() => {
    setMenuList(menus.split(' | '));
    console.log(menuList);
  }, [menus]);

  return (
    <div className={content.hiddenSpace}>
      <CloseIcon
        onClick={() => {
          navigate('/main/restaurants');
        }}
        sx={{
          position: 'absolute',
          right: '1vw',
          top: '2vh',
          width: '18px',
          '&:hover': {
            cursor: 'pointer',
          },
        }}
      />
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
        <div className={detail.category}>
          <ul>
            {categories.map((category) => (
              <li key={category.name}>{category.name}</li>
            ))}
          </ul>
        </div>
        <div className={detail.thumNail}>
          <img src={thum} alt="가게 썸네일" />
        </div>
        <div>{address}</div>
        <div>{phone}</div>
        <table className={detail.menu}>
          <caption>메뉴판</caption>
          <tbody>
            {menuList.map((menu) => (
              <tr key={menu}>
                <td>{menu}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div>
          <ul>
            {menuList.map((menu) => (
              <li key={menu}>{menu}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}

export default RestaurantDetail;

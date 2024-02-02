import { useQuery } from 'react-query';
import axios from 'axios';
import globalFilterStore from '../stores/globalFilterStore';

const fetchRegion = (API_URL) => {
  axios({
    method: 'get',
    url: `${API_URL}/region`,
  })
    .then((res) => {
      console.log('법정동', res);
    })
    .catch((err) => {
      console.error('법정동 실패', err);
    });
};

const useGetRegion = () => {
  const { API_URL } = globalFilterStore();

  console.log(useQuery('get-region', fetchRegion(API_URL)));
  // console.log(data);
};

export default useGetRegion;

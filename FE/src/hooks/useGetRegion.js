import { useQuery } from 'react-query';
import axios from 'axios';
import globalFilterStore from '../stores/globalFilterStore';

const useGetRegion = () => {
  const { API_URL } = globalFilterStore();

  const { data, isError, isFetching } = useQuery('get-region', () =>
    axios.get(`${API_URL}/region`)
  );
  console.log('여기가 useQuery', data, isError, isFetching);
  return data;
};

export default useGetRegion;

// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import CircularProgress from '@mui/material/CircularProgress';
// import globalFilterStore from '../../stores/globalFilterStore';
// import progress from '../../styles/foodmap/SearchFetch.module.css';

// function SearchFetch() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get('query');
//   const { API_URL, setSearchList } = globalFilterStore();

//   const onSuccess = (data) => {
//     console.log('글로벌 검색 수행 완료!', data);
//   };

//   const onError = (error) => {
//     console.log('글로벌 검색 수행 실패!', error);
//   };

//   const fetchSearchResult = () =>
//     axios.get(`${API_URL}/?query=${query}`);

//   const { isLoading, isFetching, data, isError, error } = useQuery(
//     'get-global-result',
//     fetchSearchResult,
//     {
//       onSuccess,
//       onError,
//     }
//   );

//   console.log({ isLoading, isFetching, isError });

//   if (isLoading) {
//     return (
//       <div className={progress.box}>
//         <CircularProgress />
//       </div>
//     );
//   }
//   if (isError) console.log(error);
//   if (isFetching) {
//     setSearchList(data.data.items);
//   }
// }

// export default SearchFetch;

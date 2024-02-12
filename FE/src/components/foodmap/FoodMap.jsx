import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import urlStore from '../../stores/urlStore';
import foodmap from '../../styles/foodmap/FoodMap.module.css';
import markerStyle from '../../styles/mapcontents/marker.module.css';
import dongsanStore from '../../stores/dongsanStore';
import userStore from '../../stores/userStore';

function FoodMap() {
  const mapRef = useRef(null);
  const { currentMyLocation } = useGeolocation();
  const { naver } = window;
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const { API_URL } = urlStore();
  const tenPowSeven = 10 ** 7;
  let restaurantId = 0;
  const { dongsanUsers } = dongsanStore(); // 동산에 추가된 유저 정보
  const { accessToken } = userStore();

  // 지도 중심 좌표
  const [centerLat, setCenterLat] = useState(currentMyLocation.lat);
  const [centerLng, setCenterLng] = useState(currentMyLocation.lng);

  // 유저가 로그인하면 본인의 이전 동산 상태를 참고하여 지도의 초기 위치 조정(나중에 토큰의 변동으로 useEffect 동작을 제어해야함!)
  useEffect(() => {
    if (dongsanUsers.length !== 0) {
      axios({
        method: 'get',
        url: `${API_URL}/restaurant/v2/${1}`,
      })
        .then((res) => {
          console.log('로그인한 사용자의 맛집 목록', res);
          setCenterLat(res.data[0].mapy / tenPowSeven);
          setCenterLng(res.data[0].mapx / tenPowSeven);
          console.log('위치', centerLat, centerLng);
        })
        .catch((err) => {
          console.error('로그인한 사용자의 맛집 목록ㅠㅠ', err);
        });
    }
  }, [accessToken]);

  // 최초 렌더링 및 이용자의 현재 위치가 변할 때 지도 제작 코드(나중에 for문을 수정해야함 - 동산의 정보를 토대로!)
  useEffect(() => {
    if (naver && naver.maps) {
      if (
        currentMyLocation.lat !== 0 &&
        currentMyLocation.lng !== 0
      ) {
        // 네이버 지도 옵션 선택
        const mapOptions = {
          // 지도의 초기 중심 좌표
          center: new naver.maps.LatLng(centerLat, centerLng),
          logoControl: false, // 네이버 로고 표시 X
          mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
          scaleControl: true, // 지도 축척 컨트롤의 표시 여부
          tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
          zoom: 16, // 지도의 초기 줌 레벨
          zoomControl: true, // 줌 컨트롤 표시
          zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
        };
        mapRef.current = new naver.maps.Map('map', mapOptions);

        // eslint-disable-next-line max-depth
        if (dongsanUsers.length !== 0) {
          // 로그인 했을 때
          // eslint-disable-next-line max-depth
          for (let i = 1; i < 3; i += 1) {
            axios({
              method: 'get',
              url: `${API_URL}/restaurant/v2/${i}`,
            })
              // eslint-disable-next-line no-loop-func
              .then((res) => {
                console.log(
                  '처음 지도가 생성될 때 로그인한 사용자의 맛집 목록',
                  res
                );
                const searchList = res.data;
                const markers = [];
                const infoWindows = [];

                // 마커 찍기
                for (let j = 0; j < searchList.length; j += 1) {
                  const markerContent = `
                    <div class=${markerStyle.wrapper}>
                      <img src="/test/cat.jpg" alt="프로필 사진" class=${markerStyle.imgStyle}>
                      <div class=${markerStyle.restaurantInfo}>${searchList[j].name}</div>
                    </div>
                  `;
                  const marker = new naver.maps.Marker({
                    map: mapRef.current,
                    position: new naver.maps.LatLng(
                      searchList[j].mapy / tenPowSeven,
                      searchList[j].mapx / tenPowSeven
                    ),
                    icon: {
                      content: markerContent,
                      anchor: new naver.maps.Point(0, 50),
                    },
                  });

                  const infoWindowContent = `
                    <div class=${markerStyle.none} id="restaurantId">${searchList[i].id}</div>
                  `;
                  const infoWindow = new naver.maps.InfoWindow({
                    content: infoWindowContent,
                    anchorSize: {
                      width: 0,
                      height: 0,
                    },
                    borderWidth: 0,
                  });

                  markers.push(marker);
                  infoWindows.push(infoWindow);
                }

                // 마커 클릭 이벤트
                const getClickHandler = (index) => () => {
                  if (infoWindows[index].getMap()) {
                    infoWindows[index].close();
                  } else if (mapRef.current !== null) {
                    infoWindows[index].open(
                      mapRef.current,
                      markers[index]
                    );
                    restaurantId =
                      document.querySelector(
                        '#restaurantId'
                      ).innerText;
                    console.log('클릭한 가게 아이디', restaurantId);
                    infoWindows[index].close();
                    navigate(
                      `/main/restaurants/${restaurantId}/detail`,
                      {
                        state: {
                          id: restaurantId,
                        },
                      }
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록 함수
                const registerClickHandlers = () => {
                  for (let j = 0; j < markers.length; j += 1) {
                    naver.maps.Event.addListener(
                      markers[j],
                      'click',
                      getClickHandler(j)
                    );
                  }
                };

                // 정보창의 이벤트 핸들러 등록
                registerClickHandlers();

                // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'zoom_changed',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
                // 지도 드래그 시 마커 업데이트 이벤트 핸들러
                naver.maps.Event.addListener(
                  mapRef.current,
                  'dragend',
                  () => {
                    if (mapRef.current !== null) {
                      checkForMarkersRendering(
                        mapRef.current,
                        markers
                      );
                    }
                  }
                );
              })
              .catch((err) => {
                console.error(
                  '처음 지도가 생성될 때 로그인한 사용자의 맛집 목록ㅠㅠ',
                  err
                );
              });
          }
        }
      }
    }
  }, [currentMyLocation, dongsanUsers]);

  // GNB 검색창을 통해 검색할 때 지도 생성 후 마커 생성하는 코드
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (
          currentMyLocation.lat !== 0 &&
          currentMyLocation.lng !== 0 &&
          mapRef.current !== null &&
          query !== null
        ) {
          const response = await axios.get(
            `${API_URL}/naver/search/v2/?query=${query}`
          );
          console.log('글로벌 검색 수행 완료!', response);
          const searchList = response.data;

          const markers = [];
          const infoWindows = [];

          // 네이버 지도 옵션 선택
          const mapOptions = {
            // 지도의 초기 중심 좌표
            center: new naver.maps.LatLng(
              searchList[0].mapy / tenPowSeven,
              searchList[0].mapx / tenPowSeven
            ),
            logoControl: false, // 네이버 로고 표시 X
            mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
            scaleControl: true, // 지도 축척 컨트롤의 표시 여부
            tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
            zoom: 14, // 지도의 초기 줌 레벨
            zoomControl: true, // 줌 컨트롤 표시
            zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
          };
          mapRef.current = new naver.maps.Map('map', mapOptions);

          const createMarkerAndInfoWindow = (item) => {
            const markerContent = `
              <div class=${markerStyle.wrapper}>
                <div class=${markerStyle.searchInfo}>${item.name}</div>
              </div>
            `;
            const marker = new naver.maps.Marker({
              map: mapRef.current,
              position: new naver.maps.LatLng(
                item.mapy / tenPowSeven,
                item.mapx / tenPowSeven
              ),
              icon: {
                content: markerContent,
                anchor: new naver.maps.Point(0, 50),
              },
            });

            const infoWindowContent = `
              <div class=${markerStyle.none} id="restaurantId">${item.id}</div>
            `;

            const infoWindow = new naver.maps.InfoWindow({
              content: infoWindowContent,
              zIndex: -100,
              anchorSize: {
                width: 0,
                height: 0,
              },
              borderWidth: 0,
            });

            markers.push(marker);
            infoWindows.push(infoWindow);
          };

          // eslint-disable-next-line max-depth
          for (let i = 0; i < searchList.length; i += 1) {
            createMarkerAndInfoWindow(searchList[i]);
          }

          const getClickHandler = (index) => () => {
            if (infoWindows[index].getMap()) {
              infoWindows[index].close();
            } else if (mapRef.current !== null) {
              infoWindows[index].open(mapRef.current, markers[index]);

              restaurantId =
                document.querySelector('#restaurantId').innerText;
              infoWindows[index].close();

              navigate(`/main/restaurants/${restaurantId}/detail`, {
                state: {
                  id: restaurantId,
                },
              });
            }
          };

          // 정보창의 이벤트 핸들러 등록 함수
          const registerClickHandlers = () => {
            for (let i = 0; i < markers.length; i += 1) {
              naver.maps.Event.addListener(
                markers[i],
                'click',
                getClickHandler(i)
              );
            }
          };

          // 정보창의 이벤트 핸들러 등록
          registerClickHandlers();

          // 지도 줌 인/아웃 시 마커 업데이트 이벤트 핸들러
          naver.maps.Event.addListener(
            mapRef.current,
            'zoom_changed',
            () => {
              if (mapRef.current !== null) {
                checkForMarkersRendering(mapRef.current, markers);
              }
            }
          );
          // 지도 드래그 시 마커 업데이트 이벤트 핸들러
          naver.maps.Event.addListener(
            mapRef.current,
            'dragend',
            () => {
              if (mapRef.current !== null) {
                checkForMarkersRendering(mapRef.current, markers);
              }
            }
          );
        }
      } catch (error) {
        console.error('글로벌 검색 수행 중 오류 발생!', error);
      }
    };

    fetchData();
  }, [currentMyLocation, query]);

  return <div id="map" className={foodmap.map} />;
}

export default FoodMap;

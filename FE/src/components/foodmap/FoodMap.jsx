import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import globalFilterStore from '../../stores/globalFilterStore';
import foodmap from '../../styles/foodmap/FoodMap.module.css';

function FoodMap() {
  const mapRef = useRef(null);
  const { currentMyLocation } = useGeolocation();
  const { naver } = window;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query');
  const { API_URL } = globalFilterStore();

  useEffect(() => {
    if (naver && naver.maps) {
      if (
        currentMyLocation.lat !== 0 &&
        currentMyLocation.lng !== 0
      ) {
        // 네이버 지도 옵션 선택
        const mapOptions = {
          // 지도의 초기 중심 좌표
          center: new naver.maps.LatLng(
            currentMyLocation.lat,
            currentMyLocation.lng
          ),
          logoControl: false, // 네이버 로고 표시 X
          mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
          scaleControl: true, // 지도 축척 컨트롤의 표시 여부
          tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
          zoom: 16, // 지도의 초기 줌 레벨
          zoomControl: true, // 줌 컨트롤 표시
          zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
        };
        mapRef.current = new naver.maps.Map('map', mapOptions);
      }
    }
  }, [currentMyLocation]);

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
            `${API_URL}/naver/search/?query=${query}`
          );
          console.log('글로벌 검색 수행 완료!', response);
          const searchList = response.data.items;

          const markers = [];
          const infoWindows = [];
          const tenPowSeven = 10 ** 7;

          // 네이버 지도 옵션 선택
          const mapOptions = {
            // 지도의 초기 중심 좌표
            center: new naver.maps.LatLng(
              Number(searchList[0].mapy) / tenPowSeven,
              Number(searchList[0].mapx) / tenPowSeven
            ),
            logoControl: false, // 네이버 로고 표시 X
            mapDataControl: false, // 지도 데이터 저작권 컨트롤 표시 X
            scaleControl: true, // 지도 축척 컨트롤의 표시 여부
            tileDuration: 200, // 지도 타일을 전환할 때 페이드 인 효과의 지속 시간(밀리초)
            zoom: 16, // 지도의 초기 줌 레벨
            zoomControl: true, // 줌 컨트롤 표시
            zoomControlOptions: { position: 9 }, // 줌 컨트롤 우하단에 배치
          };
          mapRef.current = new naver.maps.Map('map', mapOptions);

          const createMarkerAndInfoWindow = (item) => {
            const marker = new naver.maps.Marker({
              map: mapRef.current,
              position: new naver.maps.LatLng(
                Number(item.mapy) / tenPowSeven,
                Number(item.mapx) / tenPowSeven
              ),
            });

            const infoWindow = new naver.maps.InfoWindow({
              content: [
                '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
                ` <div style="font-weight: bold; margin-bottom: 5px;">${item.title}</div>`,
                ` <div style="font-size: 13px;">${item.category}<div>`,
                '</div>',
              ].join(''),
              maxWidth: 300,
              anchorSize: {
                width: 12,
                height: 14,
              },
              borderColor: '#cdcdc7',
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

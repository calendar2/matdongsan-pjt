import { useEffect, useRef } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import checkForMarkersRendering from '../../util/checkForMarkersRendering';
import foodmap from '../../styles/foodmap/FoodMap.module.css';

function FoodMap() {
  const mapRef = useRef(null);
  const { currentMyLocation } = useGeolocation();
  const { naver } = window;

  // useEffect(() => {
  //   console.log(process.env.REACT_APP_NAVER_MAP_API_KEY);
  //   const script = document.createElement('script');
  //   script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_API_KEY}`;
  //   script.async = true;

  //   // 스크립트 로딩 완료 이벤트 핸들러
  //   script.onload = () => {
  //     console.log(
  //       '네이버지도 API 스크립트가 성공적으로 로딩되었습니다.'
  //     );
  //   };

  //   // 스크립트 로딩 실패 이벤트 핸들러
  //   script.onerror = () => {
  //     console.error('네이버지도 API 스크립트 로딩에 실패했습니다.');
  //   };

  //   document.head.appendChild(script);

  //   return () => {
  //     // Clean up the script when the component is unmounted
  //     document.head.removeChild(script);
  //   };
  // }, []);

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

      // 지도상에 핀 표시 할 부분
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          currentMyLocation.lat,
          currentMyLocation.lng
        ),
        map: mapRef.current,
      });
    }
  }, [currentMyLocation]);

  useEffect(() => {
    if (
      currentMyLocation.lat !== 0 &&
      currentMyLocation.lng !== 0 &&
      mapRef.current !== null
    ) {
      const markers = [];
      const infoWindows = [];

      for (let i = 0; i < 1; i += 1) {
        const marker = new naver.maps.Marker({
          map: mapRef.current,
          position: new naver.maps.LatLng(
            currentMyLocation.lat,
            currentMyLocation.lng
          ),
        });
        const infoWindow = new naver.maps.InfoWindow({
          content: [
            '<div style="padding: 10px; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 16px 0px;">',
            ` <div style="font-weight: bold; margin-bottom: 5px;">가게이름</div>`,
            ` <div style="font-size: 13px;">업종이나 기타 등등...<div>`,
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
      }

      const getClickHandler = (index) => () => {
        if (infoWindows[index].getMap()) {
          infoWindows[index].close();
        } else if (mapRef.current !== null) {
          infoWindows[index].open(mapRef.current, markers[index]);
        }
      };

      // 정보창의 이벤트 핸들러
      for (let i = 0; i < markers.length; i += 1) {
        naver.maps.Event.addListener(
          markers[i],
          'click',
          getClickHandler(i)
        );
      }

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
      naver.maps.Event.addListener(mapRef.current, 'dragend', () => {
        if (mapRef.current !== null) {
          checkForMarkersRendering(mapRef.current, markers);
        }
      });
    }
  }, [currentMyLocation]);

  return <div id="map" className={foodmap.map} />;
}

export default FoodMap;

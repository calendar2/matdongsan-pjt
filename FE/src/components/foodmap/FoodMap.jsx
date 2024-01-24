import { useEffect, useRef } from 'react';
import mapStore from '../../stores/mapStore';
import foodmap from '../../styles/foodmap/FoodMap.module.css';

function FoodMap() {
  const mapElement = useRef(null);
  const { map, setMap, setMarker } = mapStore();

  useEffect(() => {
    const { naver } = window;
    if (!mapElement.current || !naver) return;

    // 로케이션
    const seoul = new naver.maps.LatLng(37.3595704, 127.105399);

    // 네이버 지도 옵션 선택
    const mapOptions = {
      // bounds: new naver.maps.LatLngBounds(
      //   new naver.maps.LatLng(126.7, 37),
      //   new naver.maps.LatLng(127.5, 38)
      // ),
      center: seoul,
      scaleControl: true,
      tileDuration: 200,
      zoom: 16,
      zoomControl: true,
      zoomControlOptions: { position: 9 },
    };
    setMap(new naver.maps.Map(mapElement.current, mapOptions));

    // 지도상에 핀 표시 할 부분
    setMarker(
      new naver.maps.Marker({
        position: seoul,
        map,
      })
    );
  }, []);

  return <div className={foodmap.map} ref={mapElement} />;
}

export default FoodMap;

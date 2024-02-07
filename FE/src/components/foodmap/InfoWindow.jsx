// import StarRoundedIcon from '@mui/icons-material/StarRounded';
import mapwindow from '../../styles/mapcontents/infowindow.module.css';

function InfoWindow(props) {
  console.log('props값', props);
  return (
    <div className={mapwindow.container}>
      {/* <div>
        <div className={mapwindow.title} id="restaurantName">
          {item.title}
        </div>
        <StarRoundedIcon />
      </div>
      <div className={mapwindow.category} id="restaurantCategory">
        {item.category}
      </div>
      <div className={mapwindow.address} id="restaurantAddress">
        {item.address}
      </div>
      <div className={mapwindow.none} id="restaurantMapx">
        {Number(item.mapx)}
      </div>
      <div className={mapwindow.none} id="restaurantMapy">
        {Number(item.mapy)}
      </div>
      <div className={mapwindow.none} id="restaurantRoadAddress">
        {item.roadAddress}
      </div>
      <div className={mapwindow.none} id="restaurantPhone">
        {item.telephone}
      </div> */}
    </div>
  );
}

export default InfoWindow;

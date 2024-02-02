import { Link, Routes, Route } from "react-router-dom";
import Slider from "react-slick";
import { Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoginModal from "../modals/LoginModal";
import imgIntro1 from "../../assets/images/intro/intro_1.png";
import imgIntro2 from "../../assets/images/intro/intro_2.png";
import imgIntro3 from "../../assets/images/intro/intro_3.png";
import styles from "../../styles/start/StartView.module.css";
import userStore from "../../stores/userStore";
import Redirect from "../accounts/Redirect";

function StartMain() {
  const settings = {
    dots: true,
    // dotsClass: 'custom-dots',
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };
  const { setLoginModalOpen } = userStore();
  const handleOpen = () => setLoginModalOpen(true);

  return (
    <div className={styles.mainBox}>
      <Slider
        dots={settings.dots}
        infinite={settings.infinite}
        speed={settings.speed}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        arrows={settings.arrows}
        autoplay={settings.autoplay}
        autoplaySpeed={settings.autoplaySpeed}
      >
        <img src={imgIntro1} alt="" />
        <img src={imgIntro2} alt="" />
        <img src={imgIntro3} alt="" />
      </Slider>
      <div className={styles.buttonBox}>
        {/* <Link to="/"> */}
        <Button
          onClick={handleOpen}
          sx={{
            width: "180px",
            height: "45px",
            margin: "10px",
            backgroundColor: "white",
            boxShadow: "1px 1px 2px 1px gray",
            color: "rgba(29, 177, 119, 0.7)",
            // border: 'solid 1px rgba(29, 177, 119, 0.7)',
            ":hover": {
              backgroundColor: "rgba(29, 177, 119, 0.8)",
              color: "white",
              border: "none",
            },
          }}
        >
          맛동산 시작하기
        </Button>
        <LoginModal />
        <Routes>
          <Route path="/oauth2/kakao" element={<Redirect />} />
        </Routes>
        {/* </Link> */}
        <Link to="/main">
          <Button
            sx={{
              width: "180px",
              height: "45px",
              margin: "10px",
              boxShadow: "1px 1px 2px 1px gray",
              backgroundColor: "rgba(29, 177, 119, 0.8)",
              color: "white",
              ":hover": {
                backgroundColor: "white",
                color: "rgba(29, 177, 119, 0.7)",
              },
            }}
          >
            탐색하기
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default StartMain;

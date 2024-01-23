import * as React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Button, Modal, Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import imgIntro1 from '../../assets/images/intro/intro_1.png';
import imgIntro2 from '../../assets/images/intro/intro_2.png';
import imgIntro3 from '../../assets/images/intro/intro_3.png';
import imgLogo from '../../assets/images/logo.png';
import kakaoLogo from '../../assets/images/login/kakao.png';
import styles from '../../styles/start/StartView.module.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid rgba(29, 177, 119, 0.7)',
  boxShadow: 20,
  p: 4,
  borderRadius: '10px',
};

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
            width: '180px',
            height: '45px',
            margin: '10px',
            backgroundColor: 'white',
            boxShadow: '1px 1px 2px 1px gray',
            color: 'rgba(29, 177, 119, 0.7)',
            // border: 'solid 1px rgba(29, 177, 119, 0.7)',
            ':hover': {
              backgroundColor: 'rgba(29, 177, 119, 0.8)',
              color: 'white',
              border: 'none',
            },
          }}
        >
          맛동산 시작하기
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.loginBox} sx={style}>
            <div className={styles.loginText}>LOGIN</div>
            <img
              src={imgLogo}
              alt="mainLogo"
              className={styles.loginLogo}
            />
            <div className={styles.loginMinitext}>
              장소를 소장하다, 나의 맛집 기록
            </div>
            <Button
              sx={{
                width: '300px',
                height: '50px',
                margin: '10px',
                boxShadow: '1px 1px 2px 0px gray',
                backgroundColor: 'rgba(250, 227, 0, 0.5)',
                color: 'black',
                ':hover': {
                  backgroundColor: 'rgba(250, 227, 0, 0.7)',
                  // color: 'rgba(250, 227, 0, 0.8)',
                },
              }}
            >
              <img
                src={kakaoLogo}
                alt="kakaoLogo"
                className={styles.kakaoLogo}
              />
              카카오 계정으로 로그인하기
            </Button>
          </Box>
        </Modal>
        {/* </Link> */}
        <Link to="/main">
          <Button
            sx={{
              width: '180px',
              height: '45px',
              margin: '10px',
              boxShadow: '1px 1px 2px 1px gray',
              backgroundColor: 'rgba(29, 177, 119, 0.8)',
              color: 'white',
              ':hover': {
                backgroundColor: 'white',
                color: 'rgba(29, 177, 119, 0.7)',
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

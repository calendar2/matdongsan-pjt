import { Link } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';
import imgIntro1 from '../../assets/images/intro/intro_1.png';
import imgIntro2 from '../../assets/images/intro/intro_2.png';
import imgIntro3 from '../../assets/images/intro/intro_3.png';

function StartMain() {
  const slides = [
    { img: imgIntro1, alt: 'Introduction 1' },
    { img: imgIntro2, alt: 'Introduction 2' },
    { img: imgIntro3, alt: 'Introduction 3' },
  ];

  return (
    <div>
      <Carousel>
        {slides.map((slide) => (
          <Paper>
            <img
              src={slide.img}
              alt={slide.alt}
              style={{ width: '100%' }}
            />
          </Paper>
        ))}
      </Carousel>
      로그인 안 했을 때 캐루셀, 탐색하기, 시작하기 버튼 있는 곳
      <Link to="/">탐색하기</Link>
      <Button>시작하기</Button>
    </div>
  );
}

export default StartMain;

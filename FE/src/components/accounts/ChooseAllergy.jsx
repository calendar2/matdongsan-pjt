import { useState } from 'react';
import styles from '../../styles/accounts/ChooseAllergy.module.css';
import beafImg from '../../assets/images/signup/allergy/beef.png';
import porkImg from '../../assets/images/signup/allergy/pork.png';
import chickenImg from '../../assets/images/signup/allergy/chicken.png';
import eggImg from '../../assets/images/signup/allergy/egg.png';
import shrimpImg from '../../assets/images/signup/allergy/shrimp.png';
import crabImg from '../../assets/images/signup/allergy/crab.png';
import squidImg from '../../assets/images/signup/allergy/squid.png';
import mackerelImg from '../../assets/images/signup/allergy/mackerel.png';
import shellfishImg from '../../assets/images/signup/allergy/shellfish.png';
import milkImg from '../../assets/images/signup/allergy/milk.png';
import peanutImg from '../../assets/images/signup/allergy/peanut.png';
import walnutImg from '../../assets/images/signup/allergy/walnut.png';
import pinenutImg from '../../assets/images/signup/allergy/pinenut.png';
import soybeanImg from '../../assets/images/signup/allergy/soybean.png';
import peachImg from '../../assets/images/signup/allergy/peach.png';
import tomatoImg from '../../assets/images/signup/allergy/tomato.png';
import wheatImg from '../../assets/images/signup/allergy/wheat.png';
import buckwheatImg from '../../assets/images/signup/allergy/buckwheat.png';
import wineImg from '../../assets/images/signup/allergy/wine.png';
import signupStore from '../../stores/signupStore';

function ChooseAllergy() {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const { allergy, setAllergy } = signupStore();

  const AllergyButtonClick = (buttonValue) => {
    if (selectedButtons.includes(buttonValue)) {
      // 이미 선택된 버튼일 경우, 선택 해제
      setSelectedButtons(
        selectedButtons.filter((value) => value !== buttonValue)
      );
    } else {
      // 선택되지 않은 버튼일 경우, 선택 추가
      setSelectedButtons([...selectedButtons, buttonValue]);
    }
    setAllergy(selectedButtons.join(', '));
    console.log('알레르기:', allergy);
  };
  return (
    <div className={styles.Box}>
      <div className={styles.allergyBox}>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('소고기')}
          style={{
            backgroundColor: selectedButtons.includes('소고기')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('소고기')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '90px' }}
            src={beafImg}
            alt="beaf"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>소고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('돼지고기')}
          style={{
            backgroundColor: selectedButtons.includes('돼지고기')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('돼지고기')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={porkImg}
            alt="pork"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>돼지고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('닭고기')}
          style={{
            backgroundColor: selectedButtons.includes('닭고기')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('닭고기')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={chickenImg}
            alt="chicken"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>닭고기</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('난류')}
          style={{
            backgroundColor: selectedButtons.includes('난류')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('난류')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img src={eggImg} alt="egg" className={styles.allergyImg} />
          <div className={styles.allergyName}>난류</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('새우')}
          style={{
            backgroundColor: selectedButtons.includes('새우')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('새우')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={shrimpImg}
            alt="shrimp"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>새우</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('게')}
          style={{
            backgroundColor: selectedButtons.includes('게')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('게')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={crabImg}
            alt="crab"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>게</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('오징어')}
          style={{
            backgroundColor: selectedButtons.includes('오징어')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('오징어')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={squidImg}
            alt="squid"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>오징어</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('고등어')}
          style={{
            backgroundColor: selectedButtons.includes('고등어')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('고등어')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '80px' }}
            src={mackerelImg}
            alt="mackerel"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>고등어</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('조개류')}
          style={{
            backgroundColor: selectedButtons.includes('조개류')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('조개류')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '60px' }}
            src={shellfishImg}
            alt="shellfish"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>조개류</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('우유')}
          style={{
            backgroundColor: selectedButtons.includes('우유')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('우유')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '60px' }}
            src={milkImg}
            alt="milk"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>우유</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('땅콩')}
          style={{
            backgroundColor: selectedButtons.includes('땅콩')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('땅콩')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={peanutImg}
            alt="peanut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>땅콩</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('호두')}
          style={{
            backgroundColor: selectedButtons.includes('호두')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('호두')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={walnutImg}
            alt="walnut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>호두</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('잣')}
          style={{
            backgroundColor: selectedButtons.includes('잣')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('잣')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={pinenutImg}
            alt="pinenut"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>잣</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('대두')}
          style={{
            backgroundColor: selectedButtons.includes('대두')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('대두')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            style={{ width: '55px' }}
            src={soybeanImg}
            alt="soybean"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>대두</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('복숭아')}
          style={{
            backgroundColor: selectedButtons.includes('복숭아')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('복숭아')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={peachImg}
            alt="peach"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>복숭아</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('토마토')}
          style={{
            backgroundColor: selectedButtons.includes('토마토')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('토마토')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={tomatoImg}
            alt="tomato"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>토마토</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('밀')}
          style={{
            backgroundColor: selectedButtons.includes('밀')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('밀')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={wheatImg}
            alt="wheat"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>밀</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('메밀')}
          style={{
            backgroundColor: selectedButtons.includes('메밀')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('메밀')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={buckwheatImg}
            alt="buckwheat"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>메밀</div>
        </button>
        <button
          className={styles.allergyButton}
          type="button"
          onClick={() => AllergyButtonClick('아황산류')}
          style={{
            backgroundColor: selectedButtons.includes('아황산류')
              ? 'rgba(29, 177, 119, 0.5)'
              : 'white',
            border: selectedButtons.includes('아황산류')
              ? 'none'
              : '1px solid rgba(29, 177, 119, 0.7)',
          }}
        >
          <img
            src={wineImg}
            alt="wine"
            className={styles.allergyImg}
          />
          <div className={styles.allergyName}>아황산류</div>
        </button>

        {/* <p> 알레르기: {selectedButtons.join(', ')}</p> */}
      </div>
    </div>
  );
}

export default ChooseAllergy;

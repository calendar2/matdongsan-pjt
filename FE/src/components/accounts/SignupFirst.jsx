import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';
import styles from '../../styles/accounts/SignupFirst.module.css';

const years = Array.from({ length: 125 }, (_, index) => 2024 - index);
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
      width: 100,
    },
  },
};

function SignupFirst() {
  const [age, setAge] = useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <div
        className={styles.gridContainer}
        style={{
          borderBottom: '1px solid rgba(217, 217, 217, 0.7)',
        }}
      >
        <div className={styles.gridItem}>
          성별을 <br />
          선택해주세요
        </div>
        <div className={styles.gridItem}>
          <div>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(217, 217, 217, 0.7)',
                        ':hover': {
                          color: 'rgba(29, 177, 119, 0.3)',
                        },
                        '&.Mui-checked': {
                          color: 'rgba(29, 177, 119, 0.5)',
                        },
                      }}
                    />
                  }
                  label={<span style={{ fontSize: '14px' }}>남</span>}
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: 'rgba(217, 217, 217, 0.7)',
                        ':hover': {
                          color: 'rgba(29, 177, 119, 0.3)',
                        },
                        '&.Mui-checked': {
                          color: 'rgba(29, 177, 119, 0.5)',
                        },
                      }}
                    />
                  }
                  label={<span style={{ fontSize: '14px' }}>여</span>}
                />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
      </div>
      <div
        className={styles.gridContainer}
        style={{
          borderBottom: '1px solid rgba(217, 217, 217, 0.7)',
        }}
      >
        <div className={styles.gridItem}>
          태어난 연도를 <br />
          입력해주세요
        </div>
        <div className={styles.gridItem}>
          <div>
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel
                id="birthYearLabel"
                style={{
                  color: 'rgba(217, 217, 217, 0.7)',
                  fontSize: '13px',
                }}
              >
                출생 연도
              </InputLabel>
              <Select
                labelId="birthYearLabel"
                id="demo-simple-select-standard"
                value={age}
                onChange={handleChange}
                label="출생연도"
                defaultValue=""
                sx={{
                  fontSize: '13px',
                  width: '100px',
                  color: 'rgba(29, 177, 119, 0.8)',
                }}
                MenuProps={MenuProps}
                style={{ maxHeight: '50px' }}
              >
                {years.map((year) => (
                  <MenuItem
                    key={year}
                    value={year}
                    sx={{
                      fontSize: '13px',
                    }}
                  >
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.gridItem}>
          관심 지역을 <br /> 설정해주세요
        </div>
        <div className={styles.gridItem}>2</div>
      </div>
    </div>
  );
}

export default SignupFirst;

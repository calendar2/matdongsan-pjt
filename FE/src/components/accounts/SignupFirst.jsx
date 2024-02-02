import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styles from '../../styles/accounts/SignupFirst.module.css';
import signupStore from '../../stores/signupStore';

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
  // const [gender, setGender] = useState('');
  // const [age, setAge] = useState('');
  const {
    regionTotal,
    setRegionInterest,
    regionInterest,
    age,
    setGender,
    setAge,
  } = signupStore();
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={styles.main}>
      <div
        className={styles.gridContainer}
        style={{
          borderBottom: '1px dashed rgba(29, 177, 119, 0.3)',
        }}
      >
        <div className={styles.gridItem}>
          성별을 <br />
          선택해주세요
        </div>
        <div className={styles.gridItem}>
          {/* 체크박스로 남/여 구현 */}
          <div>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
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
                  onClick={() => setGender('male')}
                  label={<span style={{ fontSize: '14px' }}>남</span>}
                />
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
                  onClick={() => setGender('female')}
                  label={<span style={{ fontSize: '14px' }}>여</span>}
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* 여기까지 체크박스 */}
        </div>
      </div>
      <div
        className={styles.gridContainer}
        style={{
          borderBottom: '1px dashed rgba(29, 177, 119, 0.3)',
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
                  fontSize: '14px',
                  borderColor: 'green',
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
                  fontSize: '14px',
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
                      fontSize: '14px',
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
        <div className={styles.gridItem}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            sx={{
              width: '270px',
              '& .MuiOutlinedInput-root': {
                padding: '1px',
                paddingTop: '4px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.4)',
                borderRadius: '0',
                '&:hover': {
                  borderBottom: '2px solid rgba(0, 0, 0, 0.5)',
                },
                fontSize: '14px',
                color: 'rgba(29, 177, 119)',
                // border: '1px dashed red',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            // disableClearable
            options={regionTotal.map((option) => option.regionName)}
            onChange={(e, name) => {
              setRegionInterest(name);
              console.log(regionInterest);
              console.log('장소선택되었습니다!');
            }}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="읍/면/동으로 검색해주세요"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon
                        style={{ color: 'rgba(217, 217, 217)' }}
                      />
                    </InputAdornment>
                  ),
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '15px',
                    color: 'rgba(217, 217, 217)',
                    paddingLeft: '0px',
                  },
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default SignupFirst;
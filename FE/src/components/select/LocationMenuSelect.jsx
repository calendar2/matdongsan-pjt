import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import globalFilterStore from '../../stores/globalFilterStore';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  '족발/보쌈',
  '돈까스/회/일식',
  '고기/구이',
  '피자',
  '찜/탕/찌개',
  '양식',
  '중식',
  '아시안',
  '치킨',
  '백반/죽/국수',
  '버거',
  '분식',
  '카페/디저트',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function LocationMenuSelect() {
  const theme = useTheme();
  const { restaurantMenu, setRestaurantMenu } = globalFilterStore();

  const menuChange = (event) => {
    const {
      target: { value },
    } = event;
    setRestaurantMenu(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // const btnClick = () => {
  //   console.log(restaurantMenu);
  // };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">업종</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={restaurantMenu}
          onChange={menuChange}
          input={
            <OutlinedInput id="select-multiple-chip" label="업종" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, restaurantMenu, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <button type="button" onClick={btnClick}>
        버튼
      </button> */}
    </div>
  );
}

export default LocationMenuSelect;

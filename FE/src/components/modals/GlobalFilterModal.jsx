import { useState } from 'react';
import TuneTwoToneIcon from '@mui/icons-material/TuneTwoTone';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
// import TextField from '@mui/material/TextField';
import UserSortSelect from '../select/UserSortSelect';
import UserAgeSelect from '../select/UserAgeSelect';
import LocationSortSelect from '../select/LocationSortSelect';
import LocationMenuSelect from '../select/LocationMenuSelect';
import LocationSelect from '../select/LocationSelect';
// import globalFilterStore from '../../stores/globalFilterStore';
import globalFilter from '../../styles/modals/GlobalFilter.module.css';

function GlobalFilterModal() {
  // 필터 클릭
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('유저');
  const filterOpen = Boolean(anchorElFilter);
  const filterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };
  const filterClose = () => {
    setAnchorElFilter(null);
  };
  const userTab = () => {
    setCurrentFilter('유저');
  };
  const locationTab = () => {
    setCurrentFilter('장소');
  };

  // 필터 조건
  // const { location, setLocation } = globalFilterStore();

  return (
    <div>
      <TuneTwoToneIcon
        id="filter-button"
        className={globalFilter.filterBtn}
        aria-controls={filterOpen ? 'filter-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={filterOpen ? 'true' : undefined}
        onClick={filterClick}
        fontSize="large"
        color="disabled"
      />
      <Menu
        id="filter-menu"
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
        anchorEl={anchorElFilter}
        open={filterOpen}
        onClose={filterClose}
        TransitionComponent={Fade}
      >
        {currentFilter === '유저' ? (
          <div className={globalFilter.modalContainer}>
            <div className={globalFilter.btnContainer}>
              <button
                type="button"
                className={globalFilter.activeBtn}
                onClick={userTab}
              >
                유저
              </button>
              <button
                type="button"
                className={globalFilter.unactiveBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
            <div className={globalFilter.filterMenu}>
              <UserSortSelect />
              <UserAgeSelect />
            </div>
          </div>
        ) : (
          <div className={globalFilter.modalContainer}>
            <div className={globalFilter.btnContainer}>
              <button
                type="button"
                className={globalFilter.unactiveBtn}
                onClick={userTab}
              >
                유저
              </button>
              <button
                type="button"
                className={globalFilter.activeBtn}
                onClick={locationTab}
              >
                장소
              </button>
            </div>
            <div className={globalFilter.filterMenu}>
              <LocationSortSelect />
              <LocationMenuSelect />
              {/* <TextField
                id="standard-basic"
                label="장소"
                variant="standard"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              /> */}
              <LocationSelect />
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
}

export default GlobalFilterModal;

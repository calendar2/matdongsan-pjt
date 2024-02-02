import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useGetRegion from '../../hooks/useGetRegion';
import globalFilterStore from '../../stores/globalFilterStore';
import locationBox from '../../styles/select/LocationSelect.module.css';

function LocationSelect() {
  const { location, setLocation } = globalFilterStore();

  const getRegion = useGetRegion();
  console.log(getRegion?.data);

  const defaultProps = {
    options: getRegion?.data,
    getOptionLabel: (option) => option.district,
  };

  const handleAutocompleteChange = (e) => {
    setLocation(e.target.outerText);
    console.log('로케이션', location);
  };

  return (
    <div className={locationBox.wrapper}>
      <Autocomplete
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...defaultProps}
        id="auto-complete"
        autoComplete
        includeInputInList
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            label="지역"
            variant="standard"
          />
        )}
      />
    </div>
  );
}

export default LocationSelect;

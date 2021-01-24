import React from 'react';
import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import * as actions from '../../../store/actions';
import { top150cities } from '../../../top-cities';

const filter = createFilterOptions({trim: true});

const SearchPannel = (props) => {
  const [value, setValue] = React.useState(null);
  const [errorInput, setError] = React.useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        let englishLet = /^[A-Za-z0-9- ]*$/;
        if(value.LocalizedName){
          setError(false)
          props.onFetchCitiesAutocomlete(value.LocalizedName, props.units);
        } else if(!englishLet.test(value)) {
          setError(true)
        } else {
          setError(false)
          props.onFetchCitiesAutocomlete(value, props.units)
        }
        setValue(null)
    }
  return (
    <form style={{marginBottom: 10}} onSubmit={submitHandler}>
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (newValue && newValue.inputValue) {
          setValue({
            LocalizedName: newValue.inputValue,
          });

          return;
        }

        setValue(newValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            LocalizedName: `Search "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      id="free-solo-with-text-demo"
      options={top150cities}
      getOptionLabel={option => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.LocalizedName;
      }}
      renderOption={option => (
        <React.Fragment>
          {option.LocalizedName}
        </React.Fragment>
      )}
      style={{ width: 300 }}
      freeSolo
      renderInput={params => (
        <TextField
          error={errorInput}
          helperText="Only english letters"
          {...params}
          label="Search City"
          variant="outlined"
        />
      )}
    />
    </form>
  );
}

const mapStateToProps = state => {
    return {
        units: state.units.isMetric 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCitiesAutocomlete: (city, metric) => dispatch(actions.fetchCitiesAutocomlete(city, metric))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPannel);



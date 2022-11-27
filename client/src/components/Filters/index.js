import React, { useContext, useState } from 'react'
import { TextField, Button, FormControl, Select, MenuItem, Radio, Checkbox, FormControlLabel } from '@mui/material';
import { Form, Field } from 'react-final-form';
import { useLazyQuery } from '@apollo/client';
import { FILTERED_MOVIES } from '../../query/movies';
import { sortingOptions } from './ui-data';
import { useFilters } from '../../hooks';
import { Context } from './../../providers/context/context';

const Filters = ({setMovies}) => {
  const [ sortBy, setSortBy ] = useState('')
  const [ wayOfSorting, setWayOfSorting ] = useState('asc')
  const { page } = useFilters()
  const {state} = useContext(Context)
  // const []

  const [getFilteredMovies] = useLazyQuery(FILTERED_MOVIES, {
    onCompleted:(data)=>{
      const {filteredMovies} = data
      console.log('data from getFilteredMovies lazy query ---',data);
    setMovies(filteredMovies)  
  },
  onError:e=>{
    console.log(JSON.stringify(e));
  }
})
  
  const onSubmit = (event) => {
    const { sortBy, primaryReleaseYear, includeAdult } = event;
    getFilteredMovies({
      // (filtersInput:{wayOfSorting:"asc",sortBy:"popularity",releaseYear:2019,includeAdult:true}, lang:"en-US", page:1)
      variables: {
        filtersInput: {
          wayOfSorting,
          sortBy,
          releaseYear: +primaryReleaseYear,
          includeAdult,
        },
        lang: state.locale,
        page,
      },
    });
  };
  const selectValue = (e) => {
    setWayOfSorting(e.target.value)
  }

  const handleSort = (e) => {
    setSortBy(e.target.value)
  }

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Field
              name="primaryReleaseYear"
              render={({ input, meta }) => (
                <>
                  <TextField
                    placeholder="Release Year"
                    InputLabelProps={{ shrink: true }}
                    color="secondary"
                    {...input}
                  />
                </>
              )}
            />
            <Field
              name="includeAdult"
              type='checkbox'
              render={({ input, meta }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      color="secondary"
                      {...input}
                    />
                  }
                  label="include adult"
                />
              )}
            />
            <Field
              name="sortBy"
              render={({ input, meta }) => (
                <>
                  <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <Select
                      value={sortBy}
                      onChange={handleSort}
                      displayEmpty
                      {...input}
                    >
                      <MenuItem value={sortBy}>
                        <em>Select sort</em>
                      </MenuItem>
                      {sortingOptions.map(option=><MenuItem value={option.value}>{option.title}</MenuItem>)}
                    </Select>
                  </FormControl>
                </>
              )}
            />
            <Field
              name="wayOfSorting"
              render={({ input }) => (
                <>
                  <div>
                    ASC
                    <Radio
                      checked={wayOfSorting.toLowerCase() === "asc"}
                      onChange={selectValue}
                      value="asc"
                      color="secondary"
                    />
                  </div>
                  <div>
                    DESC
                    <Radio
                      checked={wayOfSorting.toLowerCase() === "desc"}
                      onChange={selectValue}
                      value="desc"
                      color="secondary"
                    />
                  </div>
                </>
              )}
            />
            <Button type="submit" color="secondary" variant="outlined">
              Search
            </Button>
          </form>
        )}
      />
    </div>
  );
}

export default Filters
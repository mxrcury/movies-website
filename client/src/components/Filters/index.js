import React, { useState } from 'react'
import { InputLabel, TextField, Button, FormControl, Select, MenuItem, Radio } from '@mui/material';
import { Form, Field } from 'react-final-form';

const Filters = () => {
  const [ sortBy, setSortBy ] = useState('')
  const [ wayOfSorting, setWayOfSorting ] = useState('asc')
  
  const onSubmit = (e) => {
    console.log({...e,wayOfSorting});
    // adding selectedValue instead of controlled input of radio buttons 


  }
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
              name="releaseData"
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
                      <MenuItem value="Popularity">Popularity</MenuItem>
                      <MenuItem value="Alphabet">Alphabet</MenuItem>
                    </Select>
                  </FormControl>
                </>
              )}
            />
            <Field
              name="waySorting"
              render={({ input }) => (
                <>
                <div>
                ASC
                  <Radio
                    checked={wayOfSorting.toLowerCase() === "asc"}
                    onChange={selectValue}
                    value="asc"
                  />
                  </div>
                  <div>
                DESC
                  <Radio
                    checked={wayOfSorting.toLowerCase() === "desc"}
                    onChange={selectValue}
                    value="desc"
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
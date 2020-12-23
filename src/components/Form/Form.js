import React from "react";
import PropTypes from "prop-types";

import { TextField, FormControl, InputLabel, MenuItem, Select, Grid, Button, Box, LinearProgress } from "@material-ui/core";

export default function Form(props) {
  const { onFormChange, onFormSubmit, disabled, classes, loading } = props;
  return (
    <form className={classes.form} onSubmit={onFormSubmit} noValidate>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            onChange={onFormChange}
            autoComplete="sample"
            name="sample"
            color="secondary"
            required
            fullWidth
            disabled={disabled}
            id="sample"
            label="Sample Textfield"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="numbers">
              Sample numbers
            </InputLabel>
            <Select
              disabled={disabled}
              defaultValue={"1"}
              labelId="numbers"
              color="secondary"
              name="numbers"
              id="numbers"
              onChange={onFormChange}
            >
              {Array.from(new Array(100), (v, i) => i + 1).map(String).map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button
        fullWidth
        type="submit"
        style={{backgroundColor: '#1890ff', color: 'white'}}
        className={classes.submit}
        disabled={disabled}
      >
        Submit
      </Button>
      {loading &&
        <Box mt={1}>
          <LinearProgress color="secondary" />
        </Box>}
    </form>
  );
}

Form.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
};

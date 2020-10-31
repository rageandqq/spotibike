import * as React from "react";
import { useContext, useState } from "react";

import SpotifyContext from "./SpotifyContext";

import { Button, Box, Slider, makeStyles } from "@material-ui/core";

const MIN_BPM = 30;
const MAX_BPM = 150;

const useStyles = makeStyles({
  root: {
    padding: 32,
  },
  buttons: {
    padding: 64,
  },
  button: {
    marginLeft: 12,
    marginRight: 12,
  },
});

const emptyFunction = () => {};
export default function Setup() {
  const [value, setValue] = useState([60, 120]);

  const { isAuth } = useContext(SpotifyContext);

  const handleChange = (_: any, newValue: any /* TODO: stricter typing */) => {
    setValue(newValue);
  };

  const classes = useStyles();

  if (!isAuth) return <></>;

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <div>Recommended BPM: ~90</div>
      <div>
        Selected BPM: {value[0]} - {value[1]}
      </div>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        step={1}
        min={MIN_BPM}
        max={MAX_BPM}
      />
      <Box
        display="flex"
        flexDirection="row"
        className={classes.buttons}
        justifyContent="space-around"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={emptyFunction}
          className={classes.button}
        >
          Make Playlist from Your Artists/Albums
        </Button>
        <Button
          variant="contained"
          onClick={emptyFunction}
          className={classes.button}
        >
          Make Playlist from Random Top Music
        </Button>
      </Box>
    </Box>
  );
}

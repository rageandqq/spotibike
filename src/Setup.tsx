import * as React from "react";
import { useCallback, useContext, useState } from "react";

import SpotifyContext from "./SpotifyContext";

import {
  Button,
  Box,
  Slider,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";

const MIN_BPM = 50;
const MAX_BPM = 220;

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
  link: {
    textDecoration: "none",
  },
  table: {
    maxWidth: 500,
    marginBottom: 40,
  },
});

const emptyFunction = () => {};
export default function Setup() {
  const [bpmRange, setBpmRange] = useState([60, 120]);

  const { isAuth } = useContext(SpotifyContext);

  const handleChange = (_: any, newBpm: any /* TODO: stricter typing */) => {
    setBpmRange(newBpm);
  };

  const classes = useStyles();
  const getSongsURI = useCallback(
    (useUserArtists: boolean) => {
      return {
        pathname: "/spotibike/songs",
        search: `?use_user_artists=${useUserArtists}&min_bpm=${bpmRange[0]}&max_bpm=${bpmRange[1]}`,
      };
    },
    [bpmRange]
  );

  if (!isAuth) return <></>;

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
      <TableContainer>
        <Table size="medium" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Biking Type</TableCell>
              <TableCell>Recommended BPM Range</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Recovery</TableCell>
              <TableCell>~100-110 BPM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Intervals</TableCell>
              <TableCell>~160+ BPM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Tempo</TableCell>
              <TableCell>~140-150 BPM</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Endurance</TableCell>
              <TableCell>~120-130 BPM</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        Selected BPM: {bpmRange[0]} - {bpmRange[1]}
      </div>
      <Slider
        value={bpmRange}
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
          {/* TODO proper styling */}
          <Link
            to={getSongsURI(true)}
            style={{ textDecoration: "none", color: "white" }}
          >
            Make Playlist from Your Liked Songs
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={emptyFunction}
          className={classes.button}
        >
          <Link
            to={getSongsURI(false)}
            style={{ textDecoration: "none", color: "black" }}
          >
            Make Playlist from Random Top Music
          </Link>
        </Button>
      </Box>
    </Box>
  );
}

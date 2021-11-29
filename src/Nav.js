import {
  Button,
  ButtonGroup,
  Drawer,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { blue } from "@material-ui/core/colors";

import React from "react";
import { useNavigate } from "react-router";
const useStyles = makeStyles({
  paper: {
    background: blue[700],
    display: "block",
  },
});
const Nav = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <Drawer variant="permanent" anchor="top" className={classes.paper}>
      <Typography variant="h5" color="primary">
        Nav
      </Typography>
      <ButtonGroup>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/")}
        >
          Notes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/create")}
        >
          Create
        </Button>
      </ButtonGroup>
    </Drawer>
  );
};

export default Nav;

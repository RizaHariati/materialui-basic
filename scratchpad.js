import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "../components/NoteCard";

const useStyles = makeStyles({
  card: {
    minHeight: 300,
  },
});

const Notes = () => {
  const [note, setNote] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/nav_menu",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => setNote(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (note === []) return <div></div>;
  else {
    return (
      <div>
        <Typography variant="h5" color="primary">
          Notes
        </Typography>
        <Grid container spacing={2} className={classes.card}>
          {note.map((item) => {
            const { id } = item;
            return (
              <Grid item key={id} lg={3} md={4} sm={6}>
                <NoteCard item={item} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
};

export default Notes;
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Layout from "./components/Layout";
import { createTheme } from "@material-ui/core";
import { blueGrey, brown } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: blueGrey,
  },
  typography: {
    fontFamily: "lato, 'sans-serif'",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="create" element={<Create />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { MoreHorizRounded } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  field: {
    marginBottom: 20,
  },
});
const NoteCard = ({ item }) => {
  const { title, detail, category } = item;
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.field}>
      <CardHeader
        avatar={<Avatar>{category.substring(0, 1).toUpperCase()}</Avatar>}
        title={title}
        action={
          <IconButton>
            <MoreHorizRounded />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="textPrimary">{detail}</Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";

import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [category, setCategory] = useState("working");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorDetail(false);
    setErrorTitle(false);
    if (!title) setErrorTitle(true);
    if (!detail) setErrorDetail(true);
    if (title && detail) {
      axios({
        method: "POST",
        url: "http://localhost:8000/nav_menu",
        headers: { "Content-type": "application/json" },
        data: { title, detail, category },
      })
        .then((res) => {
          console.log(res);
          navigate("/");
        })
        .catch((err) => console.log(err));

      setTitle("");
      setDetail("");
    }
  };
  return (
    <Container>
      <Typography>Create new Notes</Typography>
      <form noValidate autoComplete="false" onSubmit={handleSubmit}>
        <TextField
          label="Notes title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errorTitle}
          className={classes.field}
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Notes detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          error={errorDetail}
          className={classes.field}
          multiline
          rows={4}
          variant="outlined"
          fullWidth
        />
        <FormControl className={classes.field}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              label="working"
              value="working"
              control={<Radio />}
            />
            <FormControlLabel label="todos" value="todos" control={<Radio />} />
            <FormControlLabel
              label="reminder"
              value="reminder"
              control={<Radio />}
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;

import { Button, ButtonGroup } from "@material-ui/core";
import { Create, NoteOutlined } from "@material-ui/icons";
import React from "react";
import { useNavigate } from "react-router";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ButtonGroup>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          startIcon={<NoteOutlined color="secondary" />}
        >
          Notes
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/create")}
          startIcon={<Create color="primary" />}
        >
          Create
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Nav;

import React from "react";
import Nav from "../Nav";

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;

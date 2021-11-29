import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Container, makeStyles, Grid } from "@material-ui/core";
import NoteCard from "../components/NoteCard";
const useStyles = makeStyles({
  container: {
    marginTop: 70,
    display: "flex",
    flexDirection: "column",
  },
});
const Notes = () => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8000/nav_menu",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => setNotes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteItem = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    axios({
      method: "DELETE",
      url: `http://localhost:8000/nav_menu/${id}`,
      headers: { "Content-type": "application/json" },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.container}>
      <Typography variant="h2" color="primary">
        Notes
      </Typography>
      <Grid container spacing={2}>
        {notes.map((item) => {
          const { id } = item;
          return (
            <Grid item key={id} lg={4} md={6} sm={12}>
              <NoteCard item={item} deleteItem={deleteItem} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Notes;

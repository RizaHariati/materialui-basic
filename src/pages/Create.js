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
  container: {
    marginTop: 70,
  },
  field: {
    marginBottom: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDetail, setErrorDetail] = useState(false);
  const [category, setCategory] = useState("reminder");

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorDetail(false);
    setErrorTitle(false);
    if (!title) return setErrorTitle(true);
    if (!detail) return setErrorDetail(true);
    if (title && detail) {
      axios({
        method: "POST",
        url: "http://localhost:8000/nav_menu",
        headers: { "Content-type": "application/json" },
        data: { title, detail, category },
      })
        .then((res) => navigate("/"))
        .catch((err) => console.log(err));
      setTitle("");
      setDetail("");
    }
  };
  return (
    <Container>
      <Typography variant="h2" color="secondary" className={classes.container}>
        Create
      </Typography>
      <form noValidate autoComplete="false" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          fullWidth
          label="Notes Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errorTitle}
          className={classes.field}
        />
        <TextField
          variant="outlined"
          fullWidth
          label="Notes Detail"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          multiline
          rows={4}
          error={errorDetail}
          className={classes.field}
        />
        <FormControl className={classes.field}>
          <FormLabel>Notes Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel
              label="reminders"
              value="reminders"
              control={<Radio />}
            />
            <FormControlLabel label="todos" value="todos" control={<Radio />} />
            <FormControlLabel label="money" value="money" control={<Radio />} />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="secondary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;

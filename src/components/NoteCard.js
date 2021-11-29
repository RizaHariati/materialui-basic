import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { blue, green, red } from "@material-ui/core/colors";
import { DeleteForever } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles({
  card: {
    minHeight: 70,
  },
  avatar: {
    background: (item) => {
      if (item.category === "reminders") return blue[700];
      else if (item.category === "todos") return green[400];
      else if (item.category === "money") return red[200];
    },
  },
});
const NoteCard = ({ item, deleteItem }) => {
  const { title, detail, category, id } = item;
  const classes = useStyles(item);
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {category.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={() => deleteItem(id)}>
            <DeleteForever color="error" />
          </IconButton>
        }
        title={
          <Typography variant="h5" color="primary">
            {title}
          </Typography>
        }
      ></CardHeader>
      <CardContent className={classes.card}>
        <Typography>{detail}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="outlined" color="primary">
          {category}
        </Button>
      </CardActions>
    </Card>
  );
};

export default NoteCard;

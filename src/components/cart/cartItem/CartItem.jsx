import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import useStyles from './styles.js';

const CartItem = ({ item }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardMedia
        image={item.media.source}
        alt={item.name}
        className={classes.media}
      />
      <CardContent className={classes.CardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button type='button' size='small'>
            -
          </Button>
          <Typography>{item.quantity}</Typography>
          <Button type='button' size='small'>
            +
          </Button>
        </div>
        <IconButton variant='contained' type='button' color='secondary'>
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default CartItem;

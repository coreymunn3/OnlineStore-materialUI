import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';

const Cart = () => {
  // const isEmpty = true

  // const EmptyCart = () => {
  //   <Typography variant='subtitle1'>You have no items in your cart</Typography>
  // }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h3'>
        {' '}
        Your Shopping Cart
      </Typography>
      {isEmpty ? <EmptyCart></EmptyCart> : <FilledCart></FilledCart>}
    </Container>
  );
};

export default Cart;
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CartItem from './cartItem/CartItem';
import useStyles from './styles';

const Cart = ({
  cart,
  handleUpdateCartQuantity,
  handleRemoveFromCart,
  handleEmptyCart,
}) => {
  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant='subtitle1'>
      {'You have no items in your shopping cart' + ', '}
      <Link to='/' className={classes.link}>
        Start Adding Items
      </Link>
    </Typography>
  );

  const FilledCart = () => (
    <Fragment>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              handleUpdateCartQuantity={handleUpdateCartQuantity}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Checkout
          </Button>
        </div>
      </div>
    </Fragment>
  );

  if (!cart.line_items) {
    return '...Loading';
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} gutterBottom variant='h3'>
        {' '}
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? (
        <EmptyCart></EmptyCart>
      ) : (
        <FilledCart></FilledCart>
      )}
    </Container>
  );
};

export default Cart;

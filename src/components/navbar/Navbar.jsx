import React, { Fragment } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/shopping.png';
import useStyles from './styles';

const Navbar = ({ cart: { total_items } }) => {
  const classes = useStyles();
  const COMPANY_NAME = 'BuyHere.online';

  return (
    <Fragment>
      <AppBar position='fixed' className={classes.appBar} color='inherit'>
        <Toolbar>
          <Typography variant='h6' className={classes.title} color='inherit'>
            <img
              src={logo}
              alt='Commerce.js'
              height='25px'
              className={classes.image}
            />
            {COMPANY_NAME}
          </Typography>
          <div className={classes.grow}></div>
          <div className={classes.button}>
            <IconButton aria-label='Show Cart Items' color='inherit'>
              <Badge badgeContent={total_items} color='secondary'>
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;

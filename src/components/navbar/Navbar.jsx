import React, { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const COMPANY_NAME = 'BuyHere';

  return (
    <Fragment>
      <AppBar position='fixed' className={classes.appBar} color='primary'>
        <Toolbar>
          <Typography
            component={Link}
            to='/'
            variant='h6'
            className={classes.title}
            color='inherit'
          >
            <img
              src={logo}
              alt='Commerce.js'
              height='50px'
              className={classes.image}
            />
            {COMPANY_NAME}
          </Typography>
          <div className={classes.grow}></div>
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to='/cart'
                aria-label='Show Cart Items'
                color='inherit'
              >
                <Badge badgeContent={total_items} color='secondary'>
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;

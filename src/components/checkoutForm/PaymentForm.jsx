import React, { Fragment } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const PaymentForm = ({ checkoutToken }) => {
  return (
    <Fragment>
      <Review checkoutToken={checkoutToken} />
      <Divider />
    </Fragment>
  );
};

export default PaymentForm;

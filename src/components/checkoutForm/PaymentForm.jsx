import React, { Fragment } from 'react';
import { Typography, Button, Divider } from '@material-ui/core';
import {
  Elements,
  CardElement,
  ElementConsumer,
  ElementsConsumer,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, backStep }) => {
  const handleSubmit = (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    // get card element and create a payment method
    const cardElement = elements.getElement(CardElement);
  };
  return (
    <Fragment>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement></CardElement>
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>
                  Back
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='primary'
                  disabled={!stripe}
                >
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </Fragment>
  );
};

export default PaymentForm;

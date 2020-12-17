import React, { Fragment, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  CssBaseline,
} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

import { commerce } from '../../../lib/commerce';

const steps = ['Shipping Address', 'Payment Details'];

const Checkout = ({ cart, order, handleCaptureCheckout, error }) => {
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          });
          setCheckoutToken(token);
        } catch (error) {
          if (activeStep !== steps.length) history.push('/');
        }
      };
      generateToken();
    }
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        shippingData={shippingData}
        nextStep={nextStep}
        backStep={backStep}
        handleCaptureCheckout={handleCaptureCheckout}
      />
    );

  let Confirmation = () =>
    order.customer ? (
      <Fragment>
        <CssBaseline />
        <div>
          <Typography variant='h5'>
            {`Thank you for your purchase, ${order.customer.firstname} ${order.customer.lastname}`}
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order Ref: {order.customer_reference}
          </Typography>
          <br></br>
          <Button variant='outlined' type='button' component={Link} to='/'>
            Back to Home
          </Button>
        </div>
      </Fragment>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );

  if (error) {
    <Fragment>
      <Typography variant='h5'>Errror: {error}</Typography>
      <br></br>
    </Fragment>;
  }
  return (
    <Fragment>
      <div className={classes.toolbar}></div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </Fragment>
  );
};

export default Checkout;

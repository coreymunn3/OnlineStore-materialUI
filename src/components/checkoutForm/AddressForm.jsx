import React, { Fragment, useState, useEffect } from 'react';
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
} from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import CustomTextField from './CustomTextField';

import { commerce } from '../../lib/commerce';

const AddressForm = ({ checkoutToken }) => {
  // local state & methods for shipping countries
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    console.log(shippingCountries);
  };
  // local state & methods for shipping subdivisions
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');

  // local state & methods for shipping options
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');

  // hook for react-hook-formk
  const methods = useForm();

  // effect to run on mount
  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={() => console.log('submit')}>
          <Grid container spacing={3}>
            <CustomTextField required name='firstName' label='First Name' />
            <CustomTextField required name='lastName' label='Last Name' />
            <CustomTextField required name='address1' label='Address' />
            <CustomTextField required name='email' label='Email' />
            <CustomTextField required name='city' label='City' />
            <CustomTextField required name='zip' label='Zip' />
            {/* <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={'Select'}
                fullWidth
                onChange={() => console.log('select')}
              >
                <MenuItem key={1} value='Select'>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Sub-Division</InputLabel>
              <Select
                value={'Select'}
                fullWidth
                onChange={() => console.log('select')}
              >
                <MenuItem key={1} value='Select'>
                  Select Me
                </MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={'Select'}
                fullWidth
                onChange={() => console.log('select')}
              >
                <MenuItem key={1} value='Select'>
                  Select Me
                </MenuItem>
              </Select>
            </Grid> */}
          </Grid>
        </form>
      </FormProvider>
    </Fragment>
  );
};

export default AddressForm;

import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './product/Product';
import useStyles from './styles';

const products = [
  {
    id: 1,
    name: 'Shoes',
    description: 'Running Shoes',
    price: '$50',
    image:
      'https://www.apple.com/v/macbook-pro-13/f/images/overview/hero_endframe__bsza6x4fldiq_large_2x.jpg',
  },
  {
    id: 2,
    name: 'Macbook Pro',
    description: 'Apple Laptop',
    price: '$500',
    image:
      'https://www.apple.com/v/macbook-pro-13/f/images/overview/hero_endframe__bsza6x4fldiq_large_2x.jpg',
  },
];

const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar}></div>
      <Grid container justify='center' spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;

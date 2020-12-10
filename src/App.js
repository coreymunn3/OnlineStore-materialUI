import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart } from './components';

const App = () => {
  // initialize products list by calling commerce product list
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  // initialize state for the shopping cart
  const [cart, setCart] = useState({});
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };
  // fetch list of products & cart on app load
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <Navbar cart={cart} />
      <Switch>
        <Route exact path='/'>
          <Products products={products} onAddToCart={handleAddToCart} />
        </Route>
        <Route exact path='/cart'>
          <Cart cart={cart}></Cart>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

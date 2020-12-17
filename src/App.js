import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import { Products, Navbar, Cart, Checkout } from './components';

const App = () => {
  const [errorMsg, setErrorMsg] = useState('');
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
  // add item to the cart
  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };
  // update quantity in cart
  const handleUpdateCartQuantity = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };
  // remove item from cart
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };
  // empty cart totally
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  // refresh cart after order
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  //  handle checkout
  const [order, setOrder] = useState({});
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMsg(error.data.error.message);
    }
  };

  // ON APP LOAD
  // fetch list of products & initialize cart
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <Navbar cart={cart} />
      <Switch>
        <Route exact path='/'>
          <Products products={products} onAddToCart={handleAddToCart} />
        </Route>
        <Route exact path='/cart'>
          <Cart
            cart={cart}
            handleUpdateCartQuantity={handleUpdateCartQuantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleEmptyCart={handleEmptyCart}
          ></Cart>
        </Route>
        <Route exact path='/checkout'>
          <Checkout
            cart={cart}
            order={order}
            handleCaptureCheckout={handleCaptureCheckout}
            error={errorMsg}
          ></Checkout>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;

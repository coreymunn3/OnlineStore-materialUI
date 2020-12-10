import React, { useEffect, useState } from 'react';
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
    <div>
      <Navbar cart={cart} />
      {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
      <Cart cart={cart}></Cart>
    </div>
  );
};

export default App;

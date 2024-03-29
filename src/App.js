import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from 'utils/ProtectedRoute';
import AuthRoute from 'utils/AuthRoute';
import { darkTheme, lightTheme } from 'utils/Theme';
import { getTotals } from 'redux/cart/cartSlice';
import {
  Cart,
  Home,
  Login,
  NotFound,
  Product,
  ProductList,
  Products,
  Register,
  SharedLayout,
  Success,
} from 'pages/index';

function App() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { darkMode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Router>
        <Routes>
          <Route path='/' element={<SharedLayout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:category' element={<ProductList />} />
            <Route path='product/:slug' element={<Product />} />
            <Route
              path='register'
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path='login'
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path='cart'
              element={
                <AuthRoute>
                  <Cart />
                </AuthRoute>
              }
            />
            <Route
              path='success'
              element={
                <AuthRoute>
                  <Success />
                </AuthRoute>
              }
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthRoute from 'utils/AuthRoute';
import ProtectedRoute from 'utils/ProtectedRoute';
import {
  Cart,
  Home,
  Login,
  NotFound,
  Product,
  ProductList,
  Register,
  SharedLayout,
  Success,
} from 'pages/index';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Home />} />
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
  );
}

export default App;

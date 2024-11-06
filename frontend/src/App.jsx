import { Navigate, Route } from "react-router-dom";
import "./App.css";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import { Routes } from "react-router-dom";
import AdminLayout from "./components/admin-view/admin-layout";


import AdminOrder from "./pages/admin-view/order";
import AdminProduct from "./pages/admin-view/product";
import ShopingLayout from "./components/shoping-view/shoping-layout";
import NotFound from "./components/not-found/not-found-page";
import UnauthPage from "./components/not-found/unauthpage";
import Home from "./pages/shoping-view/home";
import Checkout from "./pages/shoping-view/checkout";
import ShopingListing from "./pages/shoping-view/listing";
import Account from "./pages/shoping-view/account";
import CheckAuth from "./components/common/check-auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice/authSlice";
import { Skeleton } from "antd";
import PaypalReturnPage from "./pages/shoping-view/payment-return";
function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  if (isLoading) return <Skeleton active />;
  console.log(isLoading, user);
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          {/* <Route path="/auth" element={<AuthLayout />}> */}

          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          {/* <Route path="/admin" element={<AdminLayout />}> */}

          <Route path="order" element={<AdminOrder />}></Route>
          <Route path="product" element={<AdminProduct />}></Route>
          
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShopingLayout />
            </CheckAuth>
          }
        >
          {/* <Route path="/shop" element={<ShopingLayout />}> */}
          <Route path="home" element={<Home />}></Route>
          <Route path="checkout" element={<Checkout />}></Route>
          <Route path="listing" element={<ShopingListing />}></Route>
          <Route path="account" element={<Account />}></Route>
          <Route path="paypal-return" element={<PaypalReturnPage />}></Route>
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;

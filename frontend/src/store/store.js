import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/authSlice.js";
import adminProductsSlice from "./admin-slice/product-slice/index.js";
import adminOrderSlice from "./admin-slice/order-slice/index.js";

import shopProductsSlice from "./shop-slice/product-slice/index.js";
import shopCartSlice from "./shop-slice/cart-slice/index.js";
import shopAddressSlice from "./shop-slice/address-slice/index.js";
import shopOrderSlice from "./shop-slice/order-slice/index.js";
import shopReviewSlice from "./shop-slice/review-slice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: adminProductsSlice,
    adminOrder: adminOrderSlice,

    shoppingProducts: shopProductsSlice,
    shopCart: shopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;

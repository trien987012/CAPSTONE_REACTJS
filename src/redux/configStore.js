import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducers/accountReducer";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer";

export const store = configureStore({
	reducer: {
		//  reducer con
		productReducer,
		cartReducer,
    accountReducer
	},
});

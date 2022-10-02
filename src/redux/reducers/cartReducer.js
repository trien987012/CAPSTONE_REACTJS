import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, axiosTimeout, getStoreJson, setStoreJson } from "../../utils/tools";
import { fetchProfileAction } from "./accountReducer";

const initialState = {
	cart: [],
};

const cartReducer = createSlice({
	name: "cartReducer",
	initialState,
	reducers: {
		changeQuantityAction: (state, action) => {
			const { productId, value } = action.payload;

			const findItem = state.cart.find((product) => product.id === productId);
			if (findItem.quantity >= 1) {
				findItem.quantity += value;
			}
			if (findItem.quantity < 1) {
				findItem.quantity = 1;
			}
		},

		deleteProductAction: (state, action) => {
			state.cart = state.cart.filter((i) => i.id !== action.payload);
		},

		addCartAction: (state, action) => {
			const product = action.payload;

			const findItem = state.cart.find((p) => p.id === product.id);
			if (findItem) {
				findItem.quantity += 1;
			} else {
				state.cart.push({ ...product, quantity: 1 });
			}

			const accessToken = getStoreJson(ACCESS_TOKEN)
			if(accessToken) {
				setStoreJson(accessToken, state.cart)
			}
			toast('Đã thêm sản phẩm vào giỏ hàng!', {type: 'success'})
		},

		setCartAction: (state, action) => {
			state.cart = action.payload
		}
	},
});

export const submitOrderAction = (cart, email) => {
	return async (dispatch) => {
		const orderDetail = cart.map((item) => ({
			productId: item.id,
			quantity: item.quantity,
		}));

		try {
			const result = await axiosTimeout.post("/Users/order", {
				orderDetail,
				email,
			});

			dispatch(fetchProfileAction());
			toast(result.data.content, { type: "success" });
		} catch (error) {
			toast(error.response.data.content, { type: "error" });
		}
	};
};

export const { changeQuantityAction, deleteProductAction, addCartAction, setCartAction } =
	cartReducer.actions;

export default cartReducer.reducer;

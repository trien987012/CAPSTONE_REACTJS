import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
	ACCESS_TOKEN,
	axiosTimeout,
	getStore,
	getStoreJson,
	setCookie,
	setStoreJson,
	USER_LOGIN,
} from "../../utils/tools";

const initialState = {
	user: {
		email: "",
		password: "",
		passwordConfirm: "",
		name: "",
		phone: "",
		selector: "",
	},
	userLogin: getStoreJson(USER_LOGIN), // co the null huoac obj
};

const userReducer = createSlice({
	name: "userReducer",
	initialState,
	reducers: {
		getUserAction: (state, action) => {
			const user = action.payload;
			state.user = user;
		},
		getProfileAction: (state, action) => {
			state.userLogin = action.payload;
		},
	},
});

export const { getUserAction, getProfileAction } = userReducer.actions;

export default userReducer.reducer;

// register
export const registerApi = (user, navigate) => {
	return async (dispatch) => {
		try {
			user = { ...user, gender: user.selector === "male" ? true : false };
			const result = await axiosTimeout.post(`/Users/signup`, user);
			dispatch(getUserAction(result.data.message));
      navigate('/login')
			toast(result.data.message, { type: "success" });
		} catch (err) {
			toast(err.response?.data.message, { type: "error" });
		}
	};
};

export const getProfileApi = (accessToken = getStore(ACCESS_TOKEN)) => {
	return async (dispatch) => {
		try {
			const result = await axiosTimeout.post(`/Users/getProfile`);
			// Lấy được thông tin profile => đưa lên redux
			dispatch(getProfileAction(result.data.content));
			// lưu và storage
			setStoreJson(USER_LOGIN, result.data.content);
		} catch (err) {
			console.log(err);
		}
	};
};
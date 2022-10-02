import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderBy } from "lodash";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, axiosTimeout, setStoreJson } from "../../utils/tools";

const initialState = {
	myAccount: {
		accessToken: "",
		loading: false,
		error: "",
	},
	signIn: {
		loading: false,
		error: "",
	},
	myProfile: {},
	ordersHistory: [],
};

const accountReducer = createSlice({
	initialState,
	name: "account",
	reducers: {
		signInRequest: (state) => {
			state.signIn.loading = true;
			state.signIn.error = "";
		},
		signInSuccess: (state, data) => {
			state.signIn.loading = false;
			state.signIn.error = "";
			state.myAccount.accessToken = data.payload.accessToken;
		},
		signInFailure: (state, data) => {
			state.signIn.loading = false;
			state.signIn.error = data.payload.error;
		},
		fetchProfileRequest: (state) => {
			state.signIn.loading = true;
			state.signIn.error = "";
		},
		fetchProfileSuccess: (state, data) => {
			state.signIn.loading = false;
			state.signIn.error = "";
			state.myProfile = data.payload.myProfile;
			state.ordersHistory = data.payload.ordersHistory;
		},
		fetchProfileFailure: (state, data) => {
			state.signIn.loading = false;
			state.signIn.error = data.payload.error;
		},
	},
});

export const signInFacebookAction = createAsyncThunk(
	"account/sign-in-facebook",
	async (payload, thunkAPI) => {
		const { values, cb } = payload;
		try {
			thunkAPI.dispatch(signInRequest());
			const data = await axiosTimeout.post("/Users/facebooklogin", {
				facebookToken: values,
			});
			const { accessToken } = data.data.content;

			setStoreJson(ACCESS_TOKEN, accessToken);

			thunkAPI.dispatch(signInSuccess({ accessToken }));
			cb(true);
		} catch (error) {
			console.log(error.respones);
		}
	}
);

export const signIn = createAsyncThunk(
	"account/sign-in",
	async (payload, thunkAPI) => {
		const { values, cb } = payload;
		const { email, password } = values;
		try {
			thunkAPI.dispatch(signInRequest());

			const data = await axiosTimeout.post("/Users/signin", {
				email,
				password,
			});

			const { accessToken } = data.data.content;

			setStoreJson(ACCESS_TOKEN, accessToken);

			thunkAPI.dispatch(signInSuccess({ accessToken }));
			cb(true);
		} catch (error) {
			console.log(error)
			toast(error.response.data.message, { type: "error" });
		}
	}
);

export const fetchProfileAction = createAsyncThunk(
	"account/get-profile",
	async (payload, thunkAPI) => {
		try {
			thunkAPI.dispatch(signInRequest());

			const data = await axiosTimeout.post("/Users/getProfile");
			const result = data.data.content;
			const myProfile = {
				email: result?.email,
				name: result?.name,
				password: null,
				gender: result?.gender,
				phone: result?.phone,
				facebookId: result?.facebookId,
				deleted: result?.deleted,
				avatar: result?.avatar,
			};
			
			const ordersHistory = orderBy(result?.ordersHistory, ['id'], ['desc'])

			thunkAPI.dispatch(fetchProfileSuccess({ myProfile, ordersHistory }));

		} catch (err) {
			console.log(err);
		}
	}
);

export const updateProfileAction = createAsyncThunk(
	"account/update-profile",
	async (payload, thunkAPI) => {
		const { values, cb } = payload;
		const { email, name, password, phone, gender } = values;
		try {
			const result = await axiosTimeout.post("/Users/updateProfile", {
				email,
				name,
				password,
				phone,
				gender,
			});

			if(result.data.statusCode === 200){
				thunkAPI.dispatch(fetchProfileAction())
				cb(true)
			}
		} catch (error) {
			toast(error.response.data.content, { type: "error" });
		}
	}
);

export const {
	signInRequest,
	signInSuccess,
	signInFailure,
	fetchProfileSuccess,
} = accountReducer.actions;

export default accountReducer.reducer;

import React from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { signInFacebookAction } from "../../redux/reducers/accountReducer";
import FormLogin from "./FormLogin";

export default function Login() {
	const dispatch = useDispatch();
	// const { pathname } = useLocation();
	const navigate = useNavigate();

	const responseFacebook = (res) => {
		const { accessToken } = res;

		if (accessToken) {
			dispatch(
				signInFacebookAction({
					values: accessToken,
					cb: (success) => {
						if (success) {
							navigate("/");
						}
					},
				})
			);
		}
	};

	return (
		<section className='vh-100'>
			<h1 className='text-center pt-4'>- Login -</h1>

			<div className='container py-5'>
				<div className='row d-flex align-items-center justify-content-center h-100'>
					<div className='col-md-8 col-lg-7 col-xl-6'>
						<img
							src='https://www.go.ooo/img/bg-img/Login.jpg'
							className='img-fluid'
							alt='key'
						/>
					</div>
					<div className='col-md-7 col-lg-5 col-xl-5 offset-xl-1'>
						<FormLogin />
						<div className='d-flex flex-column gap-4'>
							<FacebookLogin
								appId='1726434327729863'
								callback={responseFacebook}
								fields='name,email,picture'
								render={(renderProps) => (
                                    <button
										onClick={renderProps.onClick}
										className='btn btn-primary btn-lg btn-block btn-fb'
										
									>
										Continue with Facebook
									</button>
								)}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

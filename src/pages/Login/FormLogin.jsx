import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../redux/reducers/accountReducer";

function FormLogin() {
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const formLogin = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validate: (inValues) => {
			const returnedErrors = {};
			if (inValues.email === "" || !inValues.email) {
				returnedErrors.email = "Email is required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(inValues.email)
			) {
				returnedErrors.email = "Invalid Email";
			} else if (!inValues.password) {
				returnedErrors.password = "Password is required";
			}

			return returnedErrors;
		},
		onSubmit: (submitValues) => {
			dispatch(
				signIn({
					values: submitValues,
					cb: (success) => {
						if (success) {
							navigate("/");
						}
					},
				})
			);
		},
	});

	const { values, handleChange, handleSubmit, errors } = formLogin;

	const showPassowrd = () => {
		setShowPassword(!showPassword);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='form-outline mb-4'>
				<label className='form-label' >
					Email 
				</label>
				<input
					type='email'
					name='email'
					id='form1Example13'
					className='form-control form-control-lg'
					value={values.email}
					onChange={handleChange}
				/>
				{errors.email && <span className='text-danger'>{errors.email}</span>}
			</div>
			<div className='form-outline mb-4'>
				<label className='form-label' >
					Password
				</label>
				<div className='position-relative'>
					<input
						type={showPassword ? "text" : "password"}
						name='password'
						id='form1Example23'
						className='form-control form-control-lg'
						style={{ paddingRight: 30 }}
						value={values.password}
						onChange={handleChange}
					/>
					<span
						className='position-absolute'
						onClick={showPassowrd}
						style={{
							right: 10,
							top: "50%",
							transform: "translateY(-50%)",
							cursor: "pointer",
						}}
					>
						<i className='fa-regular fa-eye'></i>
					</span>
				</div>
				{errors.password && (
					<span className='text-danger'>{errors.password}</span>
				)}
			</div>
			<div className='d-flex justify-content-around align-items-center mb-4'>
				<div className='form-check'>
					<input
						className='form-check-input'
						type='checkbox'
						defaultValue
						id='form1Example3'
						defaultChecked
					/>

					<label className='form-check-label' >
						Remember me
					</label>
				</div>
				<div className="a-register">
				    <a href='./Register'>Register now?</a>
				</div>
			</div>
			<div className="text-center">
				<button type='submit' className='btn btn-lg btn-block btn-login' >
					Sign in
				</button>
			</div>
			<div className='divider d-flex align-items-center my-4'>
				<p className='text-center fw-bold mx-3 mb-0 text-muted'>OR</p>
			</div>
		</form>
	);
}

export default FormLogin;

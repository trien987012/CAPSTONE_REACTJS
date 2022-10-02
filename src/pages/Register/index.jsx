import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { registerApi } from "../../redux/reducers/userReducer";
import { useNavigate } from "react-router-dom";

export default function Register(props) {
	let dispatch = useDispatch();
	const navigate = useNavigate();
	const frm = useFormik({
		initialValues: {
			email: "",
			password: "",
			passwordConfirm: "",
			name: "",
			phone: "",
		},
		validationSchema: Yup.object().shape({
			//check validation
			email: Yup.string()
				.required("Email không được bỏ trống")
				.email("Email không đúng định dạng"),
			password: Yup.string()
				.required("Password không được bỏ trống")
				.min(6, "password phải có ít nhất từ 6-16 kí tự"),

			passwordConfirm: Yup.string()
				.required("Password Confirm không được bỏ trống")
				.oneOf([Yup.ref("password")], "Password phải trùng nhau"),
			name: Yup.string()
				.matches(
					/[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/,
					"Name Không đúng định dạng"
				)
				.required("Name không được bỏ trống"),
			phone: Yup.string()
				.matches(
					/(84|0[3|5|7|8|9])+([0-9]{8})\b/,
					" Số phone không hợp lệ! "
				)
				.required("Phone không được bỏ trống"),
		}),
		onSubmit: (values) => {
			console.log(values);
			dispatch(registerApi(values, navigate));
		},
	});

	return (
		<div className='register p-5' id='register'>
			<div className='container'>
				<div className='register-info '>
					<div className='title py-4 '>
						<h1>Register</h1>
						<hr />
					</div>
					<form id='formRegister' onSubmit={frm.handleSubmit}>
						<div className='reg-content row'>
							<div className='reg-left col-6'>
								<div className='input form-group'>
									<label>Email</label>
									<input
										className='form-control '
										id='email'
										onChange={frm.handleChange}
										onBlur={frm.handleBlur}
										type='email'
										placeholder='Email'
										name='email'
										required
									/>
									{frm.errors.email ? (
										<span className='text-danger'>{frm.errors.email}</span>
									) : (
										""
									)}
								</div>

								<div className='input form-group mt-4'>
									<label>Password</label>
									<input
										type='password'
										className='form-control'
										id='password'
										onChange={frm.handleChange}
										onBlur={frm.handleBlur}
										required
										placeholder='Password'
										name='password'
									/>
									{frm.errors.password ? (
										<span className='text-danger'>{frm.errors.password}</span>
									) : (
										""
									)}
								</div>

								<div className='input form-group mt-4'>
									<label>Password Confirm</label>
									<input
										type='password'
										className='form-control'
										id='passwordConfirm'
										onChange={frm.handleChange}
										onBlur={frm.handleBlur}
										required
										placeholder='Password Confirm'
										name='passwordConfirm'
									/>
									{frm.errors.passwordConfirm ? (
										<span className='text-danger'>
											{frm.errors.passwordConfirm}
										</span>
									) : (
										""
									)}
								</div>
							</div>

							<div className='reg-right col-6'>
								<div className='input form-group'>
									<label>Name</label>
									<input
										className='form-control'
										id='name'
										onChange={frm.handleChange}
										onBlur={frm.handleBlur}
										placeholder='Name'
										type='text'
										name='name'
										required
									/>
									{frm.errors.name ? (
										<span className='text-danger'>{frm.errors.name}</span>
									) : (
										""
									)}
								</div>
								<div className='input form-group mt-4'>
									<label>Phone</label>
									<input
										className='form-control'
										id='phone'
										onChange={frm.handleChange}
										onBlur={frm.handleBlur}
										placeholder='Phone'
										name='phone'
										required
									/>
									{frm.errors.phone ? (
										<span className='text-danger'>{frm.errors.phone}</span>
									) : (
										""
									)}
								</div>

								<div className='gender mt-4 d-flex'>
									<span>Gender</span>
									<div className='gender-option mx-5'>
										<input
											id='male'
											type='radio'
											name='selector'
											defaultValue='true'
											defaultChecked
										/>
										<br />
										<label htmlFor='male'>Male</label>
									</div>
									<div className='gender-option'>
										<input
											id='female'
											type='radio'
											name='selector'
											defaultValue='false'
										/>
										<br />
										<label htmlFor='female'>Female</label>
									</div>
								</div>
							</div>
						</div>
						<button
							id='submit'
							className='btn-default btn-submit btn btn-primary'
							type='submit'
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

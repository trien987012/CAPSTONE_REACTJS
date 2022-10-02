import { useFormik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateProfileAction } from "../../redux/reducers/accountReducer";

function ProfileInfo() {
	const dispatch = useDispatch();
	const { myProfile } = useSelector((state) => state.accountReducer);

	const { values, handleChange, handleSubmit, setValues, errors } = useFormik({
		initialValues: {
			name: myProfile?.name || "",
			email: myProfile?.email || "",
			phone: myProfile?.phone || "",
			gender: null,
		},
		validate: (profileValues) => {
			const errors = {};

			if (!profileValues.email) {
				errors.email = "Email is required";
			} else if (
				!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(profileValues.email)
			) {
				errors.email = "Invalid email address";
			}

			if (!profileValues.phone) {
				errors.phone = "Phone is required";
			}
			if (!profileValues.name) {
				errors.name = "Name is required";
			}

			return errors;
		},
		onSubmit: (profileValues) => {
			dispatch(
				updateProfileAction({
					values: profileValues,
					cb: (success) => {
						if (success) {
							toast("Cập nhật thông tin thành công!", { type: "success" });
						}
					},
				})
			);
		},
	});

	useEffect(() => {
		setValues({
			name: myProfile?.name,
			email: myProfile?.email,
			phone: myProfile?.phone,
			gender: myProfile?.gender,
		});
	}, [myProfile]);

	return (
		<form className='row' id='form-profile' onSubmit={handleSubmit}>
			<div className='col-6'>
				<div className='mb-3'>
					<label className='form-label'>Email</label>
					<input
						type='email'
						className='form-control'
						name='email'
						aria-describedby='emailHelpId'
						placeholder={values?.email || "Update your email"}
						onChange={handleChange}
						value={values?.email}
					/>
					{errors.email ? (
						<span className='text-danger'>{errors.email}</span>
					) : (
						<span>{""}</span>
					)}
				</div>
				<div className='mb-3'>
					<label className='form-label'>Phone</label>
					<input
						type='number'
						className='form-control'
						name='phone'
						aria-describedby='emailHelpId'
						placeholder={values?.phone || "Update your phone number"}
						onChange={handleChange}
						value={values?.phone}
					/>
					{errors.phone ? (
						<span className='text-danger'>{errors.phone}</span>
					) : (
						<span> </span>
					)}
				</div>
			</div>
			<div className='col-6'>
				<div className='mb-3'>
					<label className='form-label'>Name</label>
					<input
						type='text'
						className='form-control'
						name='name'
						aria-describedby='emailHelpId'
						placeholder={values?.name || "Update your name"}
						onChange={handleChange}
						value={values?.name}
					/>
					{errors.name ? (
						<span className='text-danger'>{errors.name}</span>
					) : (
						<span> </span>
					)}
				</div>
				<div className='mb-3 mt-3'>
					<p className='pe-5'>Gender</p>
					<div className='form-check form-check-inline'>
						<input
							defaultChecked={values?.gender}
							className='form-check-input'
							type='radio'
							name='gender'
							value={true}
							onChange={handleChange}
						/>
						<label className='form-check-label'>Male</label>
					</div>
					<div className='form-check form-check-inline'>
						<input
							defaultChecked={!values?.gender}
							className='form-check-input'
							type='radio'
							name='gender'
							value={false}
							onChange={handleChange}
						/>
						<label className='form-check-label'>Female</label>
					</div>
				</div>
				<div className='text-end'>
					<button className='btn btn-primary'>UPDATE</button>
				</div>
			</div>
		</form>
	);
}

export default ProfileInfo;

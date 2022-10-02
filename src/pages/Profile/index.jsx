import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/Products/ProductItem";
import { fetchProfileAction } from "../../redux/reducers/accountReducer";
import { ACCESS_TOKEN, getStoreJson } from "../../utils/tools";
import CartRow from "../Carts/CartRow";
import ProfileInfo from "./ProfileInfo";

export default function Profile() {
	const dispatch = useDispatch();
	const { myProfile, ordersHistory } = useSelector(
		(state) => state.accountReducer
	);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		setLoading(false);
	}, [myProfile]);

	const accessToken = getStoreJson(ACCESS_TOKEN);

	useEffect(() => {
		accessToken && dispatch(fetchProfileAction());
	}, []);

	const renderRowCart = (cart) => {
		return cart?.map((item) => {
			return <CartRow key={item.id} item={item} isHide />;
		});
	};

	return (
		<>
			<div className='row'>
				<div className="profile_title">
				<h3>Profile</h3>
				</div>
				{loading ? (
					<div className='pt-5 mb-5 pb-5 d-flex align-items-center justify-content-center'>
						<div className='spinner-border ' role='status'></div>
					</div>
				) : (
					<>
						<div className='col-2 p-3'>
							<div
								className='avatar'
								style={{
									width: "100%",
									borderRadius: "50%",
									overflow: "hidden",
								}}
							>
								<img
									// src={myProfile?.avatar}
									src='./avatar.png'
									alt=''
									width={"100%"}
									style={{ objectFit: "cover" }}
								/>
							</div>
						</div>
						<div className='col-10 p-3'>
							<ProfileInfo />
						</div>
					</>
				)}
			</div>

			<div className='row'>
				<div>
					<nav>
						<div className='nav nav-tabs' id='nav-tab' role='tablist'>
							<button
								className='nav-link active'
								id='nav-home-tab'
								data-bs-toggle='tab'
								data-bs-target='#nav-home'
								type='button'
								role='tab'
								aria-controls='nav-home'
								aria-selected='true'
							>
								Order History
							</button>
							<button
								className='nav-link'
								id='nav-profile-tab'
								data-bs-toggle='tab'
								data-bs-target='#nav-profile'
								type='button'
								role='tab'
								aria-controls='nav-profile'
								aria-selected='false'
							>
								Favorite
							</button>
						</div>
					</nav>

					<div className='tab-content mt-5' id='nav-tabContent'>
						<div
							className='tab-pane fade show active'
							id='nav-home'
							role='tabpanel'
							aria-labelledby='nav-home-tab'
						>
							<div className='row'>
								{ordersHistory?.map((order) => {
									return (
										<>
											<span style={{fontSize: 20,fontWeight:"700"}}>{`Orders have been placed on ${order?.date.slice(
												0,
												10
											)}`}</span>
											<div className ='table-responsive mt-3'>
												<table
													className='table'
													style={{ textAlign: "center",backgroundColor:"white"}}
												>
													<thead 	style={{backgroundColor:"#D9D9D9",width:"1199px"}}>
														<tr>
															<th scope='col'>Image</th>
															<th scope='col'>Name</th>
															<th scope='col'>Price</th>
															<th scope='col'>Quantity</th>
															<th scope='col'>Total</th>
														</tr>
													</thead>
													<tbody>{renderRowCart(order?.orderDetail)}</tbody>
												</table>
											</div>
										</>
									);
								})}
							</div>
						</div>
						<div
							className='tab-pane fade'
							id='nav-profile'
							role='tabpanel'
							aria-labelledby='nav-profile-tab'
						>
							
						</div>

					</div>
				</div>
			</div>
		</>
	);
}

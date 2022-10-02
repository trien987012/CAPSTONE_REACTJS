import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitOrderAction } from "../../redux/reducers/cartReducer";

import CartRow from "./CartRow";

export default function Carts() {
	const { cart } = useSelector((state) => state.cartReducer);
	const { myProfile } = useSelector((state) => state.accountReducer);
	const dispatch = useDispatch()
	const {email} = myProfile
	const handleSubmitOrder =(e) => {
		e.preventDefault()
		dispatch(submitOrderAction(cart, email))
	}

	const renderRowCart = () => {
		return cart?.map((item) => {
			return <CartRow key={item.id} item={item} />;
		});
	};

	return (
		<>
			<h1 className='py-5 text-center'>Carts</h1>
			<hr />
			<div className='table-responsive'>
				<table className='table' style={{ textAlign: "center" }}>
					<thead>
						<tr style={{backgroundColor:"#D9D9D9"}}>
							<th scope='col'>Id</th>
							<th scope='col'>Image</th>
							<th scope='col'>Name</th>
							<th scope='col'>Price</th>
							<th scope='col'>Quantity</th>
							<th scope='col'>Total</th>
							<th scope='col'>Action</th>
						</tr>
					</thead>
					<tbody>{renderRowCart()}</tbody>
					<tfoot>
						<tr>
							<th scope='row' colSpan={5} className='text-start'>
								Total
							</th>
							<th className='text-center'>
								{cart
									?.reduce((prev, curr) => curr.quantity * curr.price + prev, 0)
									.toLocaleString("en-US", {
										style: "currency",
										currency: "USD",
									})}
							</th>
							<td></td>
						</tr>
					</tfoot>
				</table>
			</div>
			<div className='text-end mt-3'>
				<button className='btn btn-primary'style={{backgroundColor:"#F2994A",border:"none"}} onClick={(e) => handleSubmitOrder(e)}>Submit Order</button>
			</div>
		</>
	);
}

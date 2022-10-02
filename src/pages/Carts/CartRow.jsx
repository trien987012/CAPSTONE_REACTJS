import React from "react";
import { useDispatch } from "react-redux";
import {
	changeQuantityAction,
	deleteProductAction,
} from "../../redux/reducers/cartReducer";

function CartRow({ item, isHide }) {
	const dispatch = useDispatch();

	const changeQuantity = (productId, value) => {
		const payload = {
			productId,
			value,
		};
		dispatch(changeQuantityAction(payload));
	};

	const deleteProduct = (productId) => {
		dispatch(deleteProductAction(productId));
	};

	return (
		<tr style={{ verticalAlign: "middle" }}>
			{!isHide && <td>{item.id}</td>}
			<td
				style={{
					width: 100,
					height: 50,
				}}
			>
				<img
					src={item.image}
					alt=''
					width={"100%"}
					height='50px'
					style={{ objectFit: "contain" }}
				/>
			</td>
			<td>{item.name}</td>
			<td>{item.price}</td>
			<td>
				{!isHide && (
					<button
						className='btn btn-success'
						style={{
							lineHeight: 1,
							height: 20,
							display: "inline-flex",
							alignItems: "center",
							backgroundColor:" #6200EE",
							border:"none"

						}}
						onClick={() => changeQuantity(item.id, 1)}
					>
						+
					</button>
				)}

				<div
					style={{
						width: 40,
						textAlign: "center",
						display: "inline-block",
					}}
				>
					{item.quantity}
				</div>
				{!isHide && (
					<button
						className='btn btn-danger'
						style={{
							lineHeight: 1,
							height: 20,
							display: "inline-flex",
							alignItems: "center",
							backgroundColor:" #6200EE",
							border:"none"

						}}
						onClick={() => changeQuantity(item.id, -1)}
					>
						-
					</button>
				)}
			</td>
			<td width='100px'>
				{(item.price * item.quantity).toLocaleString("en-US", {
					style: "currency",
					currency: "USD",
				})}
			</td>
			
			<td width='200px'>
				  {!isHide && (
					<button
						className='btn btn-primary'
						style={{
							lineHeight: 1,
							height: 30,
							display: "inline-flex",
							alignItems: "center",
							marginRight:"20px",
							backgroundColor:" #6200EE",
							border:"none"
						}}
					>
						EDIT
					</button>
				  )}
				
				  {!isHide && (
					<button
						className='btn btn-danger'
						style={{
							lineHeight: 1,
							height: 30,
							display: "inline-flex",
							alignItems: "center",
							backgroundColor:"#EB5757",
							border:"none"
						}}
						onClick={() => deleteProduct(item.id)}
					>
						DELETE
					</button>
				  )}
			</td>
			
		</tr>
	);
}

export default CartRow;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Modal from "../Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { likeProductApi } from "../../redux/reducers/productReducer";
import { addCartAction } from "../../redux/reducers/cartReducer";
function ProductItem({ product, accessToken, setShowModal }) {
	const dispatch = useDispatch();

	const handleLikeProduct = (id) => {
		
		if (accessToken) {
			dispatch(likeProductApi({
				values: id,
				cb: (success) => {
					if(success) {
						toast("Đã like sản phẩm!", {type: 'success'})
					}
				}
			}))
		} else {
			setShowModal(true);
		}
	};



	return (
		<div className='col-12 col-sm-6 col-lg-4 d-flex justify-content-center'>
			<div className='card d-flex align-items-center flex-column position-relative'>
				<NavLink
					to={`/productDetail/${product.id}`}
					relative='path'
					className='product__link w-100 text-center'
				>
					<img className='card-img-top' src={product.image} alt='Title' />
					<div className='card-body'>
						<h4 className='card-title text-start'>{product.name}</h4>
						<p className='card-text text-start'>{product.shortDescription}</p>
					</div>
				</NavLink>
				<div className='card-footer mt-auto d-flex align-items-strech w-100 p-0'>
					<button className='card-button border-0' onClick={() => dispatch(addCartAction(product))} style={{ width: "50%" }}>
						Buy now
					</button>
					<p className='m-0 text-center card-price' style={{ width: "50%" }}>
						{product.price}
					</p>
				</div>
				<div
					className='position-absolute'
					style={{
						top: 20,
						right: 20,
						fontSize: 20,
						cursor: "pointer",
						color: "#ef0023",
					}}
					onClick={()=> handleLikeProduct(product.id)}
				>
					<i className='fa-regular fa-heart'></i>

				</div>
			</div>
		</div>
	);
}

export default ProductItem;

import React from "react";
import { useSelector } from "react-redux";

function ProductItemDetail({ productId }) {
	const { productDetail: product } = useSelector(
		(state) => state.productReducer
	);
	return (
		<div className='row justify-content-between align-items-center'>
			<div className='col-12 col-sm-6 col-lg-4 ms-xl-3'>
				<img src={product.image} alt='...' className='w-100 bg-light' />
			</div>
			<div className='col-12 col-sm-6 col-lg-7'>
				<div className='ms-sm-auto ms-lg-0 w-sm-75'>
					<h3 className='product__title'>{product.name}</h3>
					<p className='product__description'>{product.description}</p>
					<div className='product__size'>
						<h4>Available size</h4>
						<div className='size-list d-flex my-3'>
							{product.size.map((s) => (
								<div className='box' key={s}>
									<span>{s}</span>
								</div>
							))}
						</div>
					</div>
					<p className='product__price'>{product.price}$</p>
					<div className='product__action'>
						<div className='product__add d-flex align-items-center'>
							<button className='btn btn-primary'>+</button>
							<span className='product__quantity' id='product__quantity'>
								0
							</span>
							<button className='btn btn-primary'>-</button>
						</div>
						<div className='mt-2'>
							<button className='product__btn-cart'>Add to cart</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductItemDetail;

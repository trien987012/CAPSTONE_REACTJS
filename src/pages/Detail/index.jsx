import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductItemDetail from "../../components/ProductDetail";
import Products from "../../components/Products";
import { getProductDetailApi } from "../../redux/reducers/productReducer";

function ProductDetail() {
	const [loading, setLoading] = useState(true);
	const { id: productId } = useParams();
	const dispatch = useDispatch();
	const { productDetail } = useSelector((state) => state.productReducer);

	const relatedProducts = productDetail?.relatedProducts;

	useEffect(() => {
		dispatch(getProductDetailApi(productId, setLoading));
	}, [productId]);

	return (
		<div >
			{loading ? (
				<div className='pt-5 mb-5 pb-5 d-flex align-items-center justify-content-center'>
					<div className='spinner-border ' role='status'></div>
				</div>
			) : (
				<>
					<section className='product-detail mt-5'>
						<div className='container-xl' id='product-detail'>
							<ProductItemDetail productId={productId} />
						</div>
					</section>
					<Products isDetail arrProduct={relatedProducts} />
				</>
			)}
		</div>
	);
}

export default ProductDetail;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ACCESS_TOKEN, getStoreJson } from "../../utils/tools";
import Modal from "../Modal";
import ProductItem from "./ProductItem";

function Products({arrProduct, isDetail}) {
	const [showModal, setShowModal] = useState(false);
  const accessToken = getStoreJson(ACCESS_TOKEN)

	return (
		<section className='product'>
			<div className='container-xl'>
				<h2 className='product__title text-center'> { isDetail ? '- Realate Product -' :'- Product Feature -'} </h2>
				<div className='product__content'>
					<div className='row' id='product__container'>
            {arrProduct?.map((product)=> {
              return <ProductItem key={product.id} product={product} accessToken={accessToken} setShowModal={setShowModal}/>
            })}
          </div>
				</div>
			</div>
      <Modal showModal={showModal} setShowModal={setShowModal}/>
		</section>
	);
}

export default Products;

import React from "react";

function CarouselItem({ product }) {
	return (
		<>
			<div className='d-flex align-items-center justify-content-between h-100'>
				<img
					src={product.image}
					alt='First slide'
					width='500px'
					height='400px'
					style={{ objectFit: "contain" }}
				/>
				<div className='carousel-item-content'
				style={{width:"700px",paddingRight:"50px"}}
				>
					<h3>{product.name}</h3>
					<p>{product.description}</p>
					<button className='btn btn-warning carousel-item-button '
					style={{backgroundColor:"#F8B653"}}
					>
						Buy now
					</button>
				</div>
			</div>
		</>
	);
}

export default CarouselItem;

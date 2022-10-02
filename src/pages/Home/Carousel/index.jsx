import React from "react";
import { useSelector } from "react-redux";
import CarouselItem from "./CarouselItem";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation } from "swiper";
import { Pagination } from "swiper";

export default function HomeCarousel() {
	const { arrProduct } = useSelector((state) => state.productReducer);
	return (
		<section className='carousel position-relative'>
			<div className='container-xl'>
				<Swiper
					navigation={true}
					loop
					className='mySwiper'
					pagination={{
						dynamicBullets: true,
					}}
					modules={[Pagination, Navigation]}
				>
					{arrProduct?.map((product) => {
						return (
							<SwiperSlide key={product.id}>
								<CarouselItem product={product} />
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>
		</section>
	);
}

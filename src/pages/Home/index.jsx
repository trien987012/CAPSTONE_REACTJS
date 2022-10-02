import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Products from "../../components/Products";
import { getProductApi } from "../../redux/reducers/productReducer";
import HomeCarousel from "./Carousel";

export default function Home() {
	const { arrProduct } = useSelector((state) => state.productReducer);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProductApi());
	}, []);
  
	return (
		<div>
			<HomeCarousel />
			<Products arrProduct={arrProduct} />
		</div>
	);
}

import React, { useState } from "react";
import { Input } from "antd";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/reducers/productReducer";
import ProductItem from "../../components/Products/ProductItem";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { addCartAction } from "../../redux/reducers/cartReducer";
import { orderBy } from "lodash";

//

export default function Search() {
	const dispatch = useDispatch();

	const [productName, setProductName] = useState("");
  const [sort, setSort] = useState('asc')


	const { arrProductSearch } = useSelector((state) => state.productReducer);

  const arrProductSearchSort = orderBy(arrProductSearch, ['price'], [sort])

	const handleChange = (e) => {
		setProductName(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();

		dispatch(searchProduct(productName));
	};

	return (
		<section className='search'>
			<div className='search-input'>
				<div className='container-fluid'>
					<label className='m'>Search</label>
					<form
						className=' form d-flex justify-content-start '
						onSubmit={(e) => handleSearch(e)}
					>
						<Input
							type='text'
							placeholder='Product name...'
							value={productName}
							onChange={(e) => handleChange(e)}
							style={{backgroundColor:"rgba(33, 33, 33, 0.08)",outline:"none",borderRadius:"5px",border:"none"}}
						/>
						<button className='search-btn'
						style={{color:"white"}}
						>Search</button>
					</form>
				</div>
			</div>
			<h1 className='title'>Search result</h1>
			<div className='sort-input me-1'>
				<Box sx={{ minWidth: 165 }}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Price</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							label='Sort by '
							defaultValue='ascending'
              value={sort}
              onChange={(e) => setSort(e.target.value)}
			  style={{backgroundColor:"rgba(33, 33, 33, 0.08)"}}
						>
							<MenuItem value='asc' style={{backgroundColor:"rgba(33, 33, 33, 0.08)"}}>Price: Ascending</MenuItem>
							<MenuItem value='desc' style={{backgroundColor:"rgba(33, 33, 33, 0.08)"}}>Price: descending</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</div>
			<div className='product__content mt-5'>
				<div className='row' id='product__container'>
					{arrProductSearchSort?.map((product) => {
						return (
							<div key={product.id} className='col-12 col-sm-6 col-lg-4 d-flex justify-content-center'>
								<Card sx={{ width: 345, mb: 7.5 }}>
									<CardMedia
										sx={{ width: "100%", objectFit: "contain" }}
										component='img'
										height='140'
										image={product?.image}
										alt='green iguana'
									/>
									<CardContent>
										<Typography gutterBottom variant='h5' component='div'>
											{product?.name}
										</Typography>
										<Typography variant='body2' color='text.secondary'>
											{product?.description.length > 50
												? `${product?.description.slice(0, 40)}...`
												: product?.description}
										</Typography>
									</CardContent>
									<CardActions sx={{ justifyContent: "space-between" }}>
										<Button
											size='small'
											onClick={() => dispatch(addCartAction(product))}
											style={{backgroundColor:"#E1B067",padding:"11px 25px",fontWeight:"700",color:"black",marginLeft:"30px"}}
										>
											Buy Now
										</Button>
										<Typography variant='body2' color='text.secondary'
										style={{backgroundColor:"rgba(33, 33, 33, 0.08)",padding:"13px 40px",fontWeight:"700",marginRight:"30px"}}>
											{product?.price} $

										</Typography>
									</CardActions>
								</Card>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}

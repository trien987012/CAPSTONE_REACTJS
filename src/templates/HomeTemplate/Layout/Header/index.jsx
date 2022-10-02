import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setCartAction } from "../../../../redux/reducers/cartReducer";
import {
	ACCESS_TOKEN,
	clearStore,
	getStoreJson,
} from "../../../../utils/tools";

export default function Header() {
	const { myAccount } = useSelector((state) => state.accountReducer);
	const { cart } = useSelector((state) => state.cartReducer);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (myAccount.accessToken) {
			const cart = getStoreJson(myAccount.accessToken);

			if (cart) {
				dispatch(setCartAction(cart));
			}
		}
	}, [myAccount]);

	const handleSignOut = () => {
		clearStore(ACCESS_TOKEN);
		window.location.reload();
	};

	const goToCart = () => {
		if (myAccount.accessToken) {
			navigate("/carts");
		} else {
			toast("Bạn cần đăng nhập!", { type: "error" });
		}
	};
	return (
		<header className='header' id='header'>
			<div className='container-xl p-0'>
				<div className='header__top d-flex align-items-center'>
					<NavLink to='/'>
						<img
							src='/logo.png'
							style={{ maxWidth: "116px" }}
							className='header__logo'
							alt='logo'
						/>
					</NavLink>
					<div className='header__menu-top d-flex align-items-center'>
						<div className='header__cart d-flex align-items-center'>
							<div style={{ cursor: "pointer" }} onClick={goToCart}>
							<i className="fa-solid fa-cart-shopping"></i>							<span>{cart.length}</span>
							</div>								
						</div>
						{!myAccount.accessToken ? (
							<NavLink to='/login'>Login</NavLink>
						) : (
							<>
								<NavLink to='/search'>Search</NavLink>
								<NavLink to='/profile'>Profile</NavLink>
							</>
						)}
						{!myAccount.accessToken ? (
							<NavLink to='/register'>Register</NavLink>
						) : (
							<button
								className='btn btn-sm ms-3 '
								style={{backgroundColor:"black",color:"#1877F2",border:"none"}}
								onClick={handleSignOut}
							>
								Sign Out
							</button>
						)}
					</div>
					<div className='toggle-menu'>
						<i className='fa-solid fa-bars' />
					</div>
				</div>
				<div className='header__bottom'>
					<nav className='header__menu-bottom'>
						<NavLink to='/'>Home</NavLink>
						<NavLink to='#'>Men</NavLink>
						<NavLink to='#'>Woman</NavLink>
						<NavLink to='#'>Kid</NavLink>
						<NavLink to='#'>Sport</NavLink>
					</nav>
				</div>
				<div className='menu__popup'>
					<NavLink to='#'>Home</NavLink>
					<NavLink to='#'>Men</NavLink>
					<NavLink to='#'>Woman</NavLink>
					<NavLink to='#'>Kid</NavLink>
					<NavLink to='#'>Sport</NavLink>
					<NavLink to='/login'>Login</NavLink>
					<NavLink to='/register'>Register</NavLink>
					<div className='menu__popup-cart d-flex align-items-center'>
						<i className='fa-solid fa-cart-shopping'></i>

						<span>(1)</span>
					</div>
				</div>
			</div>
		</header>
	);
}

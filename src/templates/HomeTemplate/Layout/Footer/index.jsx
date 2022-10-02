import React from "react";

export default function Footer() {
	return (
		<div className='container mt-5 pt-5'>
			<footer >
				<div className='footer_top'>
					<div className='row'>
						<div className='col col_1'>
							<div className='text'>
								<h2>GET HELP</h2>
								<p>Home</p>
								<p>Nike</p>
								<p>Adidas</p>
								<p>Contact</p>
							</div>
						</div>
						<div className='col col_2'>
							<div className='text'>
								<h2>SUPPORT</h2>
								<p>About</p>
								<p>Contact</p>
								<p>Help</p>
								<p>Phone</p>
							</div>
						</div>
						<div className='col col_3'>
							<div className='text'>
								<h2>REGISTER</h2>
								<p>Register</p>
								<p>Login</p>
							</div>
						</div>
					</div>
				</div>
				<div className='footer_bot'>
					<div></div>
					<p
						style={{
							backgroundColor: "grey",
							padding: "25px 30px",
							textAlign: "center",
						}}
					>
						© 2022 Cybersoft All Rights Reserved | Design Theme by Trương Tấn
						Khải.
					</p>
				</div>
			</footer>
		</div>
	);
}

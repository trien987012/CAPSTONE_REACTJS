import React from "react";

function Modal({ showModal, setShowModal }) {

	return (
		<div>
			<div
				className='modal fade show'
				id='modalId'
				tabIndex={-1}
				data-bs-backdrop='static'
				data-bs-keyboard='false'
				role='dialog'
				aria-labelledby='modalTitleId'
				aria-modal='true'
				style={
					showModal ? { display: `block`, background: "rgba(0,0,0,.3)" } : {}
				}
			>
				<div
					className='modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm'
					role='document'
				>
					<div className='modal-content'>
						<div className='modal-header pb-0' style={{ borderBottom: 0 }}>
							<button
								type='button'
								className='btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'
								onClick={() => setShowModal(false)}
							/>
						</div>
						<div className='modal-body'>
							Bạn cần đăng nhập để thực hiện hành động này!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Modal;

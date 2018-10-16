import React from 'react';
import PropTypes from 'prop-types';
import './ModalDialog.css';

const stopEventPropagation = event => {
	event.stopPropagation();
	event.nativeEvent.stopImmediatePropagation();
};

export const ModalDialog = ({ title, closable, children, confirmable, onClose, onConfirm }) => (
	<div className="modal-dialog" onClick={closable && !confirmable ? onClose : () => {}}>
		<div className="modal-dialog__frame" onClick={stopEventPropagation}>
			{(!!title || (closable && !confirmable)) && (
				<div className="modal-dialog__frame-header">
					{!!title && (
						<div className="modal-dialog__frame-header-title">{title}</div>
					)}
					{closable && !confirmable && (
						<button className="modal-dialog__frame-header-close" onClick={onClose} />
					)}
				</div>
			)}
			{!!children && (
				<div className="modal-dialog__frame-content">
					{children}
				</div>
			)}
			{confirmable && (
				<div className="modal-dialog__frame-confirm">
					<button
						className="modal-dialog__frame-confirm-button modal-dialog__frame-confirm-button_yes"
						onClick={() => onConfirm(true)}
					>
						Yes
					</button>
					<button
						className="modal-dialog__frame-confirm-button modal-dialog__frame-confirm-button_no"
						onClick={() => onConfirm(false)}
					>
						No
					</button>
				</div>
			)}
		</div>
	</div>
);

ModalDialog.propTypes = {
	title: PropTypes.string,
	closable: PropTypes.bool,
	confirmable: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
};

ModalDialog.defaultProps = {
	title: '',
	closable: true,
	confirmable: false,
	children: null,
	onClose() {},
	onConfirm() {},
};

export default ModalDialog;
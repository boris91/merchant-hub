import React from 'react';
import PropTypes from 'prop-types';
import './ModalDialog.css';

const stopEventPropagation = event => {
	event.stopPropagation();
	event.nativeEvent.stopImmediatePropagation();
};

export const ModalDialog = ({ title, closable, children, onClose }) => (
	<div className="modal-dialog" onClick={closable ? onClose : () => {}}>
		<div className="modal-dialog__frame" onClick={stopEventPropagation}>
			{(!!title || closable) && (
				<div className="modal-dialog__frame-header">
					{!!title && (
						<div className="modal-dialog__frame-header-title">{title}</div>
					)}
					{closable && (
						<button className="modal-dialog__frame-header-close" onClick={onClose} />
					)}
				</div>
			)}
			{!!children && (
				<div className="modal-dialog__frame-content">
					{children}
				</div>
			)}
		</div>
	</div>
);

ModalDialog.propTypes = {
	title: PropTypes.string,
	closable: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node),
	]),
	onClose: PropTypes.func,
};

ModalDialog.defaultProps = {
	title: '',
	closable: true,
	children: null,
	onClose() {},
};

export default ModalDialog;
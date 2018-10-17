import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Kind = {
	Default: 'default',
	Success: 'success',
	Info: 'info',
	Warn: 'warn',
	Danger: 'danger',
};

const Shape = {
	SmoothRectangle: 'smooth-rectangle',
	Circle: 'circle',
	Rectangle: 'rectangle',
};

export const Button = ({ type, kind, shape, thick, label, className, disabled, onClick }) => (
	<button
		type={type}
		className={`button button_${kind} button_${shape} ${thick ? ` button_thick` : ''} ${className}`}
		disabled={disabled}
		onClick={disabled ? () => {} : onClick}
	>
		{label}
	</button>
);

Button.propTypes = {
	type: PropTypes.string,
	kind: PropTypes.oneOf(Object.values(Kind)),
	shape: PropTypes.oneOf(Object.values(Shape)),
	thick: PropTypes.bool,
	label: PropTypes.string,
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
};

Button.defaultProps = {
	type: 'button',
	kind: Kind.Default,
	shape: Shape.SmoothRectangle,
	thick: false,
	label: '',
	className: '',
	disabled: false,
	onClick() {},
};

Button.Kind = Kind;

Button.Shape = Shape;

export default Button;
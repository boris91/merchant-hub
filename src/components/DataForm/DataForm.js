import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '../../components';
import { Mode, FieldType, FieldValueKey, FieldDefaultValue } from './DataForm.utils';
import './DataForm.css';

export class DataForm extends React.Component {
	static Mode = Mode;

	static FieldType = FieldType;

	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.oneOf(Object.values(FieldType)),
			name: PropTypes.string,
			label: PropTypes.string,
			required: PropTypes.bool,
		})).isRequired,
		data: PropTypes.shape(),
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node),
		]),
		title: PropTypes.string,
		mode: PropTypes.oneOf(Object.values(Mode)),
		editable: PropTypes.bool,
		removable: PropTypes.bool,
		actionsOnTop: PropTypes.bool,
		backNav: PropTypes.bool,
		onEdit: PropTypes.func,
		onRemove: PropTypes.func,
		onSave: PropTypes.func,
		onCreate: PropTypes.func,
		onCancel: PropTypes.func,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		data: {},
		children: null,
		title: '',
		mode: Mode.Read,
		editable: true,
		removable: true,
		actionsOnTop: false,
		backNav: true,
		onEdit() {},
		onRemove() {},
		onSave() {},
		onCreate() {},
		onCancel() {},
		onChange() {},
	};

	onFieldChange = ({ target: { type, dataset: { fieldName, fieldValueKey } }, target }) => {
		const { onChange } = this.props;
		let { [fieldValueKey]: value } = target;
		if (type === FieldType.Number) {
			value = +value;
		}
		onChange(fieldName, value);
	};

	renderField = ({ type = FieldType.Text, name, label, required = false }, index) => {
		const { mode, data: { [name]: value } } = this.props;
		const disabled = mode === Mode.Read;
		const fieldValueProps = {
			type,
			disabled,
			required,
			'data-field-name': name,
			'data-field-value-key': FieldValueKey[type],
			[FieldValueKey[type]]: typeof value === 'undefined' ? FieldDefaultValue[type] : value,
			onChange: disabled ? () => {} : this.onFieldChange,
		};

		return (
			<div className="data-form__fields-item" key={`data_form_fields_item.${name}.${type}`}>
				{!!label && <span className="data-form__fields-item-label">{label}</span>}
				<input className="data-form__fields-item-value" {...fieldValueProps}/>
			</div>
		);
	}

	renderActionButton(label, onClick, kind) {
		return (
			<Button
				kind={kind}
				label={label}
				className="data-form__actions-button"
				onClick={onClick}
			>
				{label}
			</Button>
		);
	}

	renderActions(rightAligned) {
		const { editable, removable, mode, backNav, onRemove, onSave, onEdit, onCancel, onCreate } = this.props;

		return (
			<div className={`data-form__actions${rightAligned ? ' data-form__actions_right-aligned' : ''}`}>
				{backNav && editable && mode === Mode.Read && this.renderActionButton('Back', onCancel)}
				{editable && mode === Mode.Read && this.renderActionButton('Edit', onEdit, 'info')}
				{editable && mode === Mode.Edit && this.renderActionButton('Save', onSave, 'success')}
				{editable && mode === Mode.Create && this.renderActionButton('Create', onCreate, 'success')}
				{editable && mode !== Mode.Read && this.renderActionButton('Cancel', onCancel, 'warn')}
				{removable && mode === Mode.Read && this.renderActionButton('Remove', onRemove, 'danger')}
			</div>
		);
	}

	render() {
		const { title, fields, data, children, mode, actionsOnTop } = this.props;

		return (
			<div className="data-form">
				{!!title && (
					<span className="data-form__title">{`${mode === Mode.Read ? '' : `${mode} `}${title}`}</span>
				)}
				{actionsOnTop && this.renderActions()}
				<div className="data-form__fields">
					{!!data && fields.map(this.renderField)}
				</div>
				{!!children && <div className="data-form__content">{children}</div>}
				{!actionsOnTop && this.renderActions(true)}
			</div>
		);
	}
}

export default DataForm;
import React from 'react';
import PropTypes from 'prop-types';
import './DataForm.css';

const Mode = {
	Read: 'read',
	Edit: 'edit',
	Create: 'create',
};

const FieldType = {
	Text: 'text',
	Number: 'number',
	Checkbox: 'checkbox',
	Image: 'image',
};

const FieldValueKey = {
	[FieldType.Text]: 'value',
	[FieldType.Number]: 'value',
	[FieldType.Checkbox]: 'checked',
	[FieldType.Image]: 'value',
};

const FieldDefaultValue = {
	[FieldType.Text]: '',
	[FieldType.Number]: 0,
	[FieldType.Checkbox]: false,
	[FieldType.Image]: '',
};

export class DataForm extends React.Component {
	static Mode = Mode;

	static FieldType = FieldType;

	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.oneOf(Object.values(FieldType)),
			name: PropTypes.string,
			label: PropTypes.string,
		})).isRequired,
		data: PropTypes.shape(),
		title: PropTypes.string,
		mode: PropTypes.oneOf(Object.values(Mode)),
		editable: PropTypes.bool,
		removable: PropTypes.bool,
		onEdit: PropTypes.func,
		onRemove: PropTypes.func,
		onSave: PropTypes.func,
		onCreate: PropTypes.func,
		onCancel: PropTypes.func,
		onChange: PropTypes.func,
	};

	static defaultProps = {
		data: {},
		title: 'Untitled',
		mode: Mode.Read,
		editable: true,
		removable: true,
		onEdit() {},
		onRemove() {},
		onSave() {},
		onCreate() {},
		onCancel() {},
		onChange() {},
	};

	onFieldChange = ({ target: { dataset: { fieldName, fieldValueKey } }, target }) => {
		const { onChange } = this.props;
		onChange(fieldName, target[fieldValueKey]);
	};

	renderField = ({ type = FieldType.Text, name, label }, index) => {
		const { mode, data: { [name]: value } } = this.props;
		const disabled = mode === Mode.Read;
		const fieldValueProps = {
			type,
			disabled,
			'data-field-name': name,
			'data-field-value-key': FieldValueKey[type],
			[FieldValueKey[type]]: typeof value === 'undefined' ? FieldDefaultValue[type] : value,
			onChange: disabled ? () => {} : this.onFieldChange,
		};

		return (
			<div className="data-form__fields-item" key={`data_form_fields_item.${name}.${type}`}>
				{!!label && <span className="data-form__fields-item__label">{label}</span>}
				<input className="data-form__fields-item__value" {...fieldValueProps}/>
			</div>
		);
	}

	render() {
		const { title, fields, data, mode, editable, removable, onEdit, onSave, onCreate, onCancel, onRemove } = this.props;

		return (
			<div className="data-form">
				<span className="data-form__title">{title}</span>
				<div className="data-form__fields">
					{!!data && fields.map(this.renderField)}
				</div>
				<div className="data-form__actions">
					{editable && mode === Mode.Read && (
						<button onClick={onEdit}>Edit</button>
					)}
					{editable && mode === Mode.Edit && (
						<button onClick={onSave}>Save</button>
					)}
					{editable && mode === Mode.Create && (
						<button onClick={onCreate}>Create</button>
					)}
					{editable && mode !== Mode.Read && (
						<button onClick={onCancel}>Cancel</button>
					)}
					{removable && mode === Mode.Read && (
						<button onClick={onRemove}>Remove</button>
					)}
				</div>
			</div>
		);
	}
}

export default DataForm;
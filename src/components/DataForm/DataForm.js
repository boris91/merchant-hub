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
	Bool: 'checkbox',
	Image: 'file',
	Date: 'date',
};

const FieldValueKey = {
	[FieldType.Text]: 'value',
	[FieldType.Number]: 'value',
	[FieldType.Bool]: 'checked',
	[FieldType.Image]: 'defaultValue',
	[FieldType.Date]: 'value',
};

const FieldDefaultValue = {
	[FieldType.Text]: '',
	[FieldType.Number]: 0,
	[FieldType.Bool]: false,
	[FieldType.Image]: '',
	[FieldType.Date]: '',
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
		children: PropTypes.oneOfType([
			PropTypes.node,
			PropTypes.arrayOf(PropTypes.node),
		]),
		title: PropTypes.string,
		mode: PropTypes.oneOf(Object.values(Mode)),
		editable: PropTypes.bool,
		removable: PropTypes.bool,
		actionsOnTop: PropTypes.bool,
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
				{!!label && <span className="data-form__fields-item-label">{label}</span>}
				<input className="data-form__fields-item-value" {...fieldValueProps}/>
			</div>
		);
	}

	renderActions() {
		const { editable, removable, mode, onRemove, onSave, onEdit, onCancel, onCreate } = this.props;

		return (
			<div className="data-form__actions">
				{editable && mode === Mode.Read && (
					<button className="data-form__actions-button data-form__actions-button_back" onClick={onCancel}>Back</button>
				)}
				{editable && mode === Mode.Read && (
					<button className="data-form__actions-button data-form__actions-button_edit" onClick={onEdit}>Edit</button>
				)}
				{editable && mode === Mode.Edit && (
					<button className="data-form__actions-button data-form__actions-button_save" onClick={onSave}>Save</button>
				)}
				{editable && mode === Mode.Create && (
					<button className="data-form__actions-button data-form__actions-button_create" onClick={onCreate}>Create</button>
				)}
				{editable && mode !== Mode.Read && (
					<button className="data-form__actions-button data-form__actions-button_cancel" onClick={onCancel}>Cancel</button>
				)}
				{removable && mode === Mode.Read && (
					<button className="data-form__actions-button data-form__actions-button_remove" onClick={onRemove}>Remove</button>
				)}
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
				{!actionsOnTop && this.renderActions()}
			</div>
		);
	}
}

export default DataForm;
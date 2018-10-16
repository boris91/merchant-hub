export const Mode = {
	Read: 'read',
	Edit: 'edit',
	Create: 'create',
};

export const FieldType = {
	Text: 'text',
	Number: 'number',
	Bool: 'checkbox',
	Image: 'file',
	Date: 'date',
	Email: 'email',
};

export const FieldValueKey = {
	[FieldType.Text]: 'value',
	[FieldType.Number]: 'value',
	[FieldType.Bool]: 'checked',
	[FieldType.Image]: 'defaultValue',
	[FieldType.Date]: 'value',
	[FieldType.Email]: 'value',
};

export const FieldDefaultValue = {
	[FieldType.Text]: '',
	[FieldType.Number]: 0,
	[FieldType.Bool]: false,
	[FieldType.Image]: '',
	[FieldType.Date]: '',
	[FieldType.Email]: '',
};
import React from 'react';
import { ModalDialog, DataForm } from '../../components';

export const ModalForm = ({ title, ...props }) => (
	<ModalDialog title={title} onClose={props.onCancel}>
		<DataForm {...props}/>
	</ModalDialog>
);

ModalForm.FieldType = DataForm.FieldType;

ModalForm.propTypes = {
	...DataForm.propTypes,
};

ModalForm.defaultProps = {
	...DataForm.defaultProps,
};

export default ModalForm;
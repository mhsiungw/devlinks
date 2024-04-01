import { forwardRef } from 'react';

const Form = forwardRef((props, ref) => (
	<form ref={ref} className='space-y-6' noValidate>
		{props.children}
	</form>
));

Form.displayName = 'Form';

export default Form;

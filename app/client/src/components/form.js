import { forwardRef } from 'react';

const Form = forwardRef(({ action, children }, ref) => (
	<form action={action} ref={ref} noValidate>
		{children}
	</form>
));

Form.displayName = 'Form';

export default Form;

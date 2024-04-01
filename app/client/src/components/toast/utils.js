import {
	toast, Slide,
} from 'react-toastify';

export const defaultToastOptions = {
	position: 'top-right',
	autoClose: 2000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	theme: 'colored',
	transition: Slide,
};

export const showToast = (
	type,
	content,
	options,
) => {
	const optionsToApply = { ...defaultToastOptions, ...options };

	switch (type) {
	case 'success':
		return toast.success(content, optionsToApply);
	case 'error':
		return toast.error(content, optionsToApply);
	case 'info':
		return toast.info(content, optionsToApply);
	case 'warning':
		return toast.warn(content, optionsToApply);
	case 'default':
		return toast(content, optionsToApply);
	default:
		return toast(content, optionsToApply);
	}
};

// eslint-disable-next-line import/prefer-default-export
export function getAPIUrl() {
	const componentType = process?.env?.IS_SERVER_FLAG ? 'server' : 'client';

	switch (componentType) {
		case 'server':
			return process.env.API_URL_FOR_SERVER;
		case 'client':
			return process.env.NEXT_PUBLIC_API_URL_FOR_CLIENT;
		default:
			return 'http://localhost:3000/';
	}
}

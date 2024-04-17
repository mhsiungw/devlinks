import IconGithub from '@/images/icon-github.svg';
import IconGitlab from '@/images/icon-gitlab.svg';
import IconHashnode from '@/images/icon-hashnode.svg';
import IconFacebook from '@/images/icon-facebook.svg';
import IconDevto from '@/images/icon-devto.svg';
import IconCodewars from '@/images/icon-codewars.svg';
import IconCodepen from '@/images/icon-codepen.svg';
import IconLinkedIn from '@/images/icon-linkedin.svg';
import IconStackOverflow from '@/images/icon-stack-overflow.svg';
import IconTwitch from '@/images/icon-twitch.svg';
import IconTwitter from '@/images/icon-twitter.svg';
import IconYoutube from '@/images/icon-youtube.svg';
import IconFrontendMentor from '@/images/icon-frontend-mentor.svg';
import IconFreeCodeCamp from '@/images/icon-freecodecamp.svg';

export function getClientUrl() {
	switch (process?.env?.NEXT_PUBLIC_MODE) {
		case 'development':
			return 'http://localhost:3001';
		case 'staging':
			return 'http://localhost:3001';
		case 'production':
			return 'http://minstack/';
		default:
			return 'http://localhost:3001';
	}
}

export function getAPIUrl() {
	const componentType = process?.env?.IS_SERVER_FLAG ? 'server' : 'client';

	switch (componentType) {
		case 'server':
			return process.env.API_URL_FOR_SERVER;
		case 'client':
			return process.env.NEXT_PUBLIC_API_URL_FOR_CLIENT;
		default:
			return 'http://localhost:3000';
	}
}

export function getIconConfig(type) {
	const config = {
		Icon: null,
		title: '',
		color: ''
	};

	switch (Number(type)) {
		case 1:
			config.Icon = IconGithub;
			config.title = 'Github';
			config.color = '#171515';
			break;
		case 2:
			config.Icon = IconGitlab;
			config.title = 'Gitlab';
			config.color = '#fca326';
			break;
		case 3:
			config.Icon = IconHashnode;
			config.title = 'Hashnode';
			config.color = '#0330D1';
			break;
		case 4:
			config.Icon = IconFacebook;
			config.title = 'Facebook';
			config.color = '#3b5998';
			break;
		case 5:
			config.Icon = IconDevto;
			config.title = 'Dev.to';
			config.color = '#333333';
			break;
		case 6:
			config.Icon = IconCodewars;
			config.title = 'Codewars';
			config.color = '#8A1A50';
			break;
		case 7:
			config.Icon = IconCodepen;
			config.title = 'Codepen';
			config.color = '#0ebeff';
			break;
		case 8:
			config.Icon = IconLinkedIn;
			config.title = 'LinkedIn';
			config.color = '#0a66c2';
			break;
		case 9:
			config.Icon = IconStackOverflow;
			config.title = 'Stack Overflow';
			config.color = '#EC7100';
			break;
		case 10:
			config.Icon = IconTwitch;
			config.title = 'Twitch';
			config.color = '#9146ff';
			break;
		case 11:
			config.Icon = IconTwitter;
			config.title = 'Twitter';
			config.color = '#1da1f2';
			break;
		case 12:
			config.Icon = IconYoutube;
			config.title = 'Youtube';
			config.color = '#ff0000';
			break;
		case 13:
			config.Icon = IconFrontendMentor;
			config.title = 'Frontend Mentor';
			config.color = '#ffffff';
			break;
		case 14:
			config.Icon = IconFreeCodeCamp;
			config.title = 'FreeCodeCamp';
			config.color = '#006400';
			break;
		default:
			break;
	}

	return config;
}

export function getImageDimension(file) {
	return new Promise((resolve, reject) => {
		const img = new Image();

		img.src = URL.createObjectURL(file);

		img.onload = () => {
			const width = img.naturalWidth;
			const height = img.naturalHeight;

			URL.revokeObjectURL(img.src);

			resolve({ width, height });
		};

		img.onerror = () => {
			reject(new Error({ width: null, height: null, error: true }));
		};
	});
}

import Link from 'next/link';
import IconArrowRight from '@/images/icon-arrow-right.svg';
// org icons
import IconGithub from '@/images/icon-github.svg';
import IconGitlab from '@/images/icon-gitlab.svg';
import IconHashnode from '@/images/icon-hashnode.svg';
import IconFacebook from '@/images/icon-facebook.svg';
import IconDebto from '@/images/icon-devto.svg';
import IconCodewars from '@/images/icon-codewars.svg';
import IconCodepen from '@/images/icon-codepen.svg';
import IconLinkedIn from '@/images/icon-linkedin.svg';
import IconStackOverflow from '@/images/icon-stack-overflow.svg';
import IconTwitch from '@/images/icon-twitch.svg';
import IconTwitter from '@/images/icon-twitter.svg';
import IconYoutube from '@/images/icon-youtube.svg';
import IconFrontendMentor from '@/images/icon-frontend-mentor.svg';
import IconFreeCodeCamp from '@/images/icon-freecodecamp.svg';

const getIconConfig = type => {
	const config = {
		Icon: null,
		title: '',
		color: ''
	};

	switch (type) {
		case 'github':
			config.Icon = IconGithub;
			config.title = 'Github';
			config.color = '#171515';
			break;
		case 'gitlab':
			config.Icon = IconGitlab;
			config.title = 'Gitlab';
			config.color = '#fca326';
			break;
		case 'hashnode':
			return IconHashnode;
		case 'facebook':
			config.Icon = IconFacebook;
			config.title = 'Facebook';
			config.color = '#3b5998';
			break;
		case 'debto':
			return IconDebto;
		case 'codewars':
			return IconCodewars;
		case 'codepen':
			config.Icon = IconCodepen;
			config.title = 'Codepen';
			config.color = '#0ebeff';
			break;
		case 'linkedin':
			config.Icon = IconLinkedIn;
			config.title = 'LinkedIn';
			config.color = '#0a66c2';
			break;
		case 'stackoverflow':
			return IconStackOverflow;
		case 'twitch':
			config.Icon = IconTwitch;
			config.title = 'Codepen';
			config.color = '#9146ff';
			break;
		case 'twitter':
			config.Icon = IconTwitter;
			config.title = 'Codepen';
			config.color = '#1da1f2';
			break;
		case 'youtube':
			config.Icon = IconYoutube;
			config.title = 'Codepen';
			config.color = '#ff0000';
			break;
		case 'frontendmentor':
			return IconFrontendMentor;
		case 'freecodecamp':
			config.Icon = IconFreeCodeCamp;
			config.title = 'Codepen';
			config.color = '#006400';
			break;
		default:
			break;
	}

	return config;
};

export default function LinkBar({ type, url }) {
	const { Icon, title, color } = getIconConfig(type);

	return (
		<div
			style={{ backgroundColor: color }}
			className={`flex justify-between text-white p-[14px] rounded-lg`}
		>
			<div className='flex gap-1'>
				{Icon && <Icon className='fill-white' />}
				<span className='text-xs'>{title}</span>
			</div>
			<Link href={url}>
				<IconArrowRight />
			</Link>
		</div>
	);
}

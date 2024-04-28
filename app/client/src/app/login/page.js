import Link from 'next/link';
import LogoDevlinksLarge from '@/images/logo-devlinks-large.svg';
import LoginForm from '@/app/login/login-form';

export default async function Login() {
	return (
		<div className='flex justify-center items-center h-full'>
			<div className='w-1/3 md:min-w-[425px] sm:min-w-[275px]'>
				<div className='flex justify-center md:mb-14 sm:m-4'>
					<LogoDevlinksLarge />
				</div>
				<div className='md:bg-white md:p-10 rounded-xl'>
					<div className='mb-10'>
						<h2 className='text-dark-gray sm:text-2xl md:text-3xl font-bold mb-2'>
							Login
						</h2>
						<div className='text-grey text-base'>
							Add your details below to get back into the app
						</div>
					</div>
					<LoginForm />
					<div className='text-base mt-6 flex justify-center sm:flex-col md:flex-row'>
						<span className='text-gray mr-1'>
							Don&apos; have an account?
						</span>
						<Link className='text-purple' href='/signup'>
							Create account
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
